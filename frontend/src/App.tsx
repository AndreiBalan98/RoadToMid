import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';

function App() {
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState<Record<string, string>>({});

  async function fetchMessage() {
    const res = await fetch('http://localhost:8000/health');
    const data = await res.json();
    setMessage(data.message);
  }

  async function fetchTasks() {
    const res = await fetch('http://localhost:8000/list');
    const data = await res.json();
    setTasks(data.tasksList);
  }

  useEffect(() => {
    fetchMessage();
    fetchTasks();
  }, []);

  return (
    <div>
      <div>{message}</div>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      <AddTask fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;
