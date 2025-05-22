import { useContext, useMemo } from 'react';
import { Clock } from 'lucide-react';
import TaskCard from './TaskCard';
import { TaskContext } from '@/context/TaskContext';

export default function TaskList({ filter, searchQuery }) {
  const taskContext = useContext(TaskContext);

  if (!taskContext) return null;

  const { tasks, deleteTask, changeStatus, loading, updateTask } = taskContext;

 const filteredTasks = useMemo(() => {
  return tasks.filter(task => {
    const normalizedStatus = task.status.toLowerCase().replace('_', '-');
    const matchesStatus = filter === 'all' || normalizedStatus === filter;

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });
}, [tasks, filter, searchQuery]);


  return (
    <div className="space-y-4">
      {filteredTasks.length === 0 && !loading ? (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-800 rounded-full">
              <Clock size={24} className="text-gray-400" />
            </div>
          </div>
          <h3 className="text-lg font-medium">No tasks found</h3>
          <p className="text-gray-400 mt-2">
            {searchQuery
              ? `No tasks match your search "${searchQuery}"`
              : filter === 'all'
                ? "You don't have any tasks yet"
                : `You don't have any ${filter} tasks`}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(id, status) => changeStatus(id, status)}
                onDelete={deleteTask}
                onEdit={(task) => updateTask(task)}
              />
            ))}
          </div>
          {loading && (
            <div className="py-4 flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
