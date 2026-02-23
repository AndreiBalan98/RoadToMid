import functions

print("Hi, I'm Nanny, I'm here to help you organize!")
print("(list - for listing tasks)")
print("(add <task> - for adding a task)")
print("(done <task> - for setting a task as done)")
print("(delete <task> - to deleting a task)")
print("(exit - to exit program)\n")

while(True):
    user_input = input()

    if "list" in user_input:
        functions.listTasks()
    elif "add" in user_input:
        functions.addTask(user_input[4:])
    elif "done" in user_input:
        functions.doneTask(user_input[5:])
    elif "delete" in user_input:
        functions.deleteTask(user_input[7:])
    elif "exit" in user_input:
        break
    else: 
        print("Please, try again.")
