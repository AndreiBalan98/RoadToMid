'use client'

import TaskItem from './TaskItem';

function TaskList({ tasks, fetchTasks }: { tasks: Record<string, string>, fetchTasks: () => void }) {
  return (
    <ul className="flex-1 overflow-y-auto py-2 px-6 list-none">
      {Object.entries(tasks).map(([task, state]) => (
        <TaskItem key={task} task={task} state={state} fetchTasks={fetchTasks} />
      ))}
    </ul>
  );
}

export default TaskList;
