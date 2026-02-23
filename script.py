tasks_list = []

def listTasks():
    return tasks_list

def addTask(task):
    tasks_list.append(task)

print("Hi, I'm Nanny, I'm here to help you organize!")
print("(list - for listing tasks)")
print("(add <task> - for adding a task)")
print("(done <task> - for setting a task as done)")
print("(delete <task> - to deleting a task)")
print("(exit - to exit program)\n")

while(True):
    user_input = input()

    if "list" in user_input:
        listTasks()
    elif "add" in user_input:
        addTask(user_input[4:])