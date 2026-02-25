import TaskItem from './TaskItem';

function TaskList({ tasks, fetchTasks }: { tasks: Record<string, string>, fetchTasks: () => void }) {
  return (
    <ul>
      {Object.entries(tasks).map(([task, state]) => (
        <TaskItem key={task} task={task} state={state} fetchTasks={fetchTasks} />
      ))}
    </ul>
  );
}

export default TaskList;
