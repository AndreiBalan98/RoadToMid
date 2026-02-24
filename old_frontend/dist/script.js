"use strict";
async function getMessage() {
    const response = await fetch('http://localhost:8000/health');
    return await response.json();
}
async function getTasks() {
    const response = await fetch('http://localhost:8000/list');
    return await response.json();
}
async function loadMessage() {
    const data = await getMessage();
    const el = document.getElementById('message');
    if (el)
        el.textContent = data.message;
}
async function loadTasks() {
    const data = await getTasks();
    const tasks = data.tasksList;
    const ul = document.getElementById("task-list");
    if (!ul)
        return;
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
async function add(button) {
    const input = button.previousElementSibling;
    const task = input.value.trim();
    await fetch('http://localhost:8000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });
    loadTasks();
}
async function done(button) {
    var _a;
    const span = button.previousElementSibling;
    const task = (_a = span.textContent) === null || _a === void 0 ? void 0 : _a.trim();
    await fetch('http://localhost:8000/done', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });
    loadTasks();
}
async function remove(button) {
    var _a, _b;
    const span = (_a = button.previousElementSibling) === null || _a === void 0 ? void 0 : _a.previousElementSibling;
    const task = (_b = span.textContent) === null || _b === void 0 ? void 0 : _b.trim();
    await fetch('http://localhost:8000/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });
    loadTasks();
}
loadMessage();
loadTasks();
