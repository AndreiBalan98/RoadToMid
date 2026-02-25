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
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Task nou..." />
      <button onClick={add}>Add</button>
    </div>
  );
}

export default AddTask;
