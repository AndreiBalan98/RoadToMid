from fastapi import FastAPI
from schemas import TextMessage, TasksList, Task
import functions
import json

app = FastAPI()

@app.get("/health", response_model=TextMessage)
def healthCheck():
    return {"message" : "Hi, I'm Nanny, I'm here to help you organize!\n(list - for listing tasks)\n(add <task> - for adding a task)\n(done <task> - for setting a task as done)\n(delete <task> - to deleting a task)\n(exit - to exit program)"}

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
