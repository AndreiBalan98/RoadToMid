async function getMessage() {
    response = await fetch('http://localhost:8000/health')
    content = await response.json()

    return content
}

async function getTasks() {
    response = await fetch('http://localhost:8000/list')
    content = await response.json()

    return content
}

async function loadMessage() {
    message = await getMessage()
    message = message.message

    document.getElementById('message').textContent = message
}

async function loadTasks() {
    tasks = await getTasks()
    tasks = tasks.tasksList

    ul = document.getElementById("task-list")
    ul.innerHTML = ""

    Object.entries(tasks).forEach(([task,state]) => {
        li = document.createElement("li")
        li.innerHTML = `<span>${task}</span><button onclick='done(this)'>Done</button><button onclick='remove(this)'>Delete</button>`
        if (state === "done") li.classList.add("done")

        ul.appendChild(li)
    })
}

async function add(button) {
    input = button.previousElementSibling
    task = input.value.trim()

    await fetch('http://localhost:8000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "task": task })
    });

    loadTasks()
}

async function done(button) {
    span = button.previousElementSibling
    task = span.textContent.trim()

    await fetch('http://localhost:8000/done', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "task": task })
    });

    loadTasks()
}

async function remove(button) {
    span = button.previousElementSibling.previousElementSibling
    task = span.textContent.trim()

    await fetch('http://localhost:8000/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "task": task })
    });

    loadTasks()
}

loadMessage()
loadTasks()
