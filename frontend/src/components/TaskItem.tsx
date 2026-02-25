'use client'

function TaskItem({ task, state, fetchTasks }: { task: string, state: string, fetchTasks: () => void }) {
  const isDone = state === 'done';

  async function done() {
    await fetch('http://localhost:8000/done', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    });
    fetchTasks();
  }

  async function remove() {
    await fetch('http://localhost:8000/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    });
    fetchTasks();
  }

  return (
    <li className={`flex items-center gap-2.5 py-3.5 border-b border-gray-100 last:border-b-0 ${isDone ? 'bg-green-50' : ''}`}>
      <span className={isDone ? 'flex-1 text-sm line-through text-green-600' : 'flex-1 text-sm'}>{task}</span>
      <button onClick={done} className="px-3 py-1 border border-green-500 rounded text-green-500 text-xs cursor-pointer hover:bg-green-500 hover:text-white transition-colors">Done</button>
      <button onClick={remove} className="px-3 py-1 border border-red-500 rounded text-red-500 text-xs cursor-pointer hover:bg-red-500 hover:text-white transition-colors">Delete</button>
    </li>
  );
}

export default TaskItem;
