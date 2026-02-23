from fastapi.testclient import TestClient
from script import app

client = TestClient(app)

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
