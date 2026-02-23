tasks_list = {}

def listTasks():
    print(tasks_list)

def addTask(task):
    tasks_list[task] = "pending"

def doneTask(task):
    tasks_list[task] = "done"
    
def deleteTask(task):
    del tasks_list[task]
