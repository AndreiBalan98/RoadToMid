function TaskItem({ task, state, fetchTasks }: { task: string, state: string, fetchTasks: () => void }) {
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
    <li>
      <span>{task}</span>
      <button onClick={done}>Done</button>
      <button onClick={remove}>Delete</button>
    </li>
  );
}

export default TaskItem;
