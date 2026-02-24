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
        const isDone = state === "done"
        li = document.createElement("li")
        li.className = `flex items-center gap-2.5 py-3.5 border-b border-gray-100 last:border-b-0${isDone ? " bg-green-50" : ""}`

        const spanClass = isDone
            ? "flex-1 text-sm line-through text-green-600"
            : "flex-1 text-sm"

        li.innerHTML = `
            <span class="${spanClass}">${task}</span>
            <button onclick='done(this)' class="px-3 py-1 border border-green-500 rounded text-green-500 text-xs cursor-pointer hover:bg-green-500 hover:text-white transition-colors">Done</button>
            <button onclick='remove(this)' class="px-3 py-1 border border-red-500 rounded text-red-500 text-xs cursor-pointer hover:bg-red-500 hover:text-white transition-colors">Delete</button>
        `

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
