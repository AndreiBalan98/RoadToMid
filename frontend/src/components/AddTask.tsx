'use client'

import { useState } from 'react';

function AddTask({ fetchTasks }: { fetchTasks: () => void }) {
  const [value, setValue] = useState('');

  async function add() {
    await fetch('http://localhost:8000/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: value })
    });
    setValue('');
    fetchTasks();
  }

  return (
    <div className="flex gap-2 px-6 py-4 border-t border-gray-100 bg-white">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Task nou..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-400 transition-colors"
      />
      <button onClick={add} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm cursor-pointer hover:bg-blue-600 transition-colors">
        Add
      </button>
    </div>
  );
}

export default AddTask;
