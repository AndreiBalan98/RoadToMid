from fastapi.testclient import TestClient
from script import app
import pytest

client = TestClient(app)
client_no_raise = TestClient(app, raise_server_exceptions=False)
TEST_TASK = "__test_task__"


def _safe_delete(task_name):
    try:
        client.request("DELETE", "/delete", json={"task": task_name})
    except Exception:
        pass


@pytest.fixture
def test_task():
    _safe_delete(TEST_TASK)
    yield
    _safe_delete(TEST_TASK)


# --- Teste existente ---

def test_health_001():
    response = client.get("/health")
    assert response.status_code == 200

def test_health_010():
    for _ in range(10):
        response = client.get("/health")
        assert response.status_code == 200

def test_health_100():
    for _ in range(100):
        response = client.get("/health")
        assert response.status_code == 200

def test_list_001():
    response = client.get("/list")
    assert response.status_code == 200

def test_list_010():
    for _ in range(10):
        response = client.get("/list")
        assert response.status_code == 200

def test_list_100():
    for _ in range(100):
        response = client.get("/list")
        assert response.status_code == 200


# --- Grup 1: Validare body raspuns ---

def test_health_body():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["message"] == "Hi, I'm Nanny, I'm here to help you organize!"

def test_list_body():
    response = client.get("/list")
    assert response.status_code == 200
    data = response.json()
    assert "tasksList" in data
    assert isinstance(data["tasksList"], dict)


# --- Grup 2: Endpoint-uri netestare (/add, /done, /delete) ---

def test_add_task(test_task):
    response = client.post("/add", json={"task": TEST_TASK})
    assert response.status_code == 200
    assert response.json()["message"] == "Succesfully added task!"

def test_add_task_appears_in_list(test_task):
    client.post("/add", json={"task": TEST_TASK})
    tasks = client.get("/list").json()["tasksList"]
    assert TEST_TASK in tasks
    assert tasks[TEST_TASK] == "pending"

def test_done_task(test_task):
    client.post("/add", json={"task": TEST_TASK})
    response = client.patch("/done", json={"task": TEST_TASK})
    assert response.status_code == 200
    assert response.json()["message"] == "Succesfully doned task!"

def test_done_task_status_in_list(test_task):
    client.post("/add", json={"task": TEST_TASK})
    client.patch("/done", json={"task": TEST_TASK})
    tasks = client.get("/list").json()["tasksList"]
    assert tasks[TEST_TASK] == "done"

def test_delete_task(test_task):
    client.post("/add", json={"task": TEST_TASK})
    response = client.request("DELETE", "/delete", json={"task": TEST_TASK})
    assert response.status_code == 200
    assert response.json()["message"] == "Succesfully deleted task!"

def test_delete_task_not_in_list(test_task):
    client.post("/add", json={"task": TEST_TASK})
    client.request("DELETE", "/delete", json={"task": TEST_TASK})
    tasks = client.get("/list").json()["tasksList"]
    assert TEST_TASK not in tasks


# --- Grup 3: Flux complet ---

def test_full_workflow(test_task):
    # add
    client.post("/add", json={"task": TEST_TASK})
    tasks = client.get("/list").json()["tasksList"]
    assert TEST_TASK in tasks
    assert tasks[TEST_TASK] == "pending"

    # done
    client.patch("/done", json={"task": TEST_TASK})
    tasks = client.get("/list").json()["tasksList"]
    assert tasks[TEST_TASK] == "done"

    # delete
    client.request("DELETE", "/delete", json={"task": TEST_TASK})
    tasks = client.get("/list").json()["tasksList"]
    assert TEST_TASK not in tasks


# --- Grup 4: Edge cases ---

def test_delete_nonexistent_task(test_task):
    # TEST_TASK nu exista (fixture l-a sters inainte)
    response = client_no_raise.request("DELETE", "/delete", json={"task": TEST_TASK})
    assert response.status_code == 500  # KeyError nehandled

def test_done_nonexistent_task(test_task):
    # TEST_TASK nu exista, dar /done nu verifica asta - creeaza taskul cu "done"
    response = client.patch("/done", json={"task": TEST_TASK})
    assert response.status_code == 200
    tasks = client.get("/list").json()["tasksList"]
    assert TEST_TASK in tasks
    assert tasks[TEST_TASK] == "done"
