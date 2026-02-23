import json

def loadTasks():
    with open("tasks.json", "r") as f:
        return json.load(f)

def saveTasks(tasks):
    with open("tasks.json", "w") as f:
        json.dump(tasks, f)

def listTasks():
    return {"tasksList" : loadTasks()}

def addTask(task):
    tasks = loadTasks()
    tasks[task] = "pending"
    saveTasks(tasks)

def doneTask(task):
    tasks = loadTasks()
    tasks[task] = "done"
    saveTasks(tasks)
    
def deleteTask(task):
    tasks = loadTasks()
    del tasks[task]
    saveTasks(tasks)
