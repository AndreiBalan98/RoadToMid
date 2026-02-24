interface HealthResponse {
    message: string;
}

interface TasksResponse {
    tasksList: Record<string, string>;
}

async function getMessage(): Promise<HealthResponse> {
    const response = await fetch('http://localhost:8000/health');
    return await response.json();
}

async function getTasks(): Promise<TasksResponse> {
    const response = await fetch('http://localhost:8000/list');
    return await response.json();
}

async function loadMessage(): Promise<void> {
    const data = await getMessage();
    const el = document.getElementById('message');
    if (el) el.textContent = data.message;
}

async function loadTasks(): Promise<void> {
    const data = await getTasks();
    const tasks = data.tasksList;

    const ul = document.getElementById("task-list");
    if (!ul) return;
    ul.innerHTML = "";

    Object.entries(tasks).forEach(([task, state]) => {
        const isDone = state === "done";
        const li = document.createElement("li");
        li.className = `flex items-center gap-2.5 py-3.5 border-b border-gray-100 last:border-b-0${isDone ? " bg-green-50" : ""}`;

        const spanClass = isDone
            ? "flex-1 text-sm line-through text-green-600"
            : "flex-1 text-sm";

        li.innerHTML = `
            <span class="${spanClass}">${task}</span>
            <button onclick='done(this)' class="px-3 py-1 border border-green-500 rounded text-green-500 text-xs cursor-pointer hover:bg-green-500 hover:text-white transition-colors">Done</button>
            <button onclick='remove(this)' class="px-3 py-1 border border-red-500 rounded text-red-500 text-xs cursor-pointer hover:bg-red-500 hover:text-white transition-colors">Delete</button>
        `;

        ul.appendChild(li);
    });
}

async function add(button: HTMLButtonElement): Promise<void> {
    const input = button.previousElementSibling as HTMLInputElement;
    const task = input.value.trim();

    await fetch('http://localhost:8000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });

    loadTasks();
}

async function done(button: HTMLButtonElement): Promise<void> {
    const span = button.previousElementSibling as HTMLSpanElement;
    const task = span.textContent?.trim();

    await fetch('http://localhost:8000/done', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });

    loadTasks();
}

async function remove(button: HTMLButtonElement): Promise<void> {
    const span = button.previousElementSibling?.previousElementSibling as HTMLSpanElement;
    const task = span.textContent?.trim();

    await fetch('http://localhost:8000/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });

    loadTasks();
}

loadMessage();
loadTasks();
