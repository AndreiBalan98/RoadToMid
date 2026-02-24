from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import TextMessage, TasksList, Task
import functions
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=TextMessage)
def healthCheck():
    return {"message" : "Hi, I'm Nanny, I'm here to help you organize!"}

@app.get("/list", response_model=TasksList)
def getTasks():
    return functions.listTasks()

@app.post("/add", response_model=TextMessage)
def addTask(task: Task):
    functions.addTask(task.task)
    return {"message" : "Succesfully added task!"}

@app.patch("/done", response_model=TextMessage)
def doneTask(task: Task):
    functions.doneTask(task.task)
    return {"message" : "Succesfully doned task!"}

@app.delete("/delete", response_model=TextMessage)
def deleteTask(task: Task):
    functions.deleteTask(task.task)
    return {"message" : "Succesfully deleted task!"}
