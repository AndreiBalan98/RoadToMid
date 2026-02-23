from fastapi import FastAPI, Body
import functions
import json

app = FastAPI()

@app.get("/health")
def healthCheck():
    return "Hi, I'm Nanny, I'm here to help you organize!\n(list - for listing tasks)\n(add <task> - for adding a task)\n(done <task> - for setting a task as done)\n(delete <task> - to deleting a task)\n(exit - to exit program)"

@app.get("/list")
def getTasks():
    return functions.listTasks()

@app.post("/add")
def addTask(task: str = Body()):
    functions.addTask(task)

@app.patch("/done")
def doneTask(task: str = Body()):
    functions.doneTask(task)

@app.delete("/delete")
def deleteTask(task: str = Body()):
    functions.deleteTask(task)
