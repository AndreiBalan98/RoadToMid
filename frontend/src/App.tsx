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
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-white shadow-lg text-gray-800">
      <div className="py-5 px-6 text-center text-base font-semibold text-blue-500 border-b border-gray-100">
        {message}
      </div>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      <AddTask fetchTasks={fetchTasks} />
    </div>
  );
}

export default App;
