import { useState, useEffect, useRef, useCallback } from 'react';
import { Clock } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({ filter, searchQuery }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const Tasks = [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finalize the project scope and deliverables for the client pitch',
      dueDate: '2025-06-01',
      status: 'pending',
     
      created: '2025-05-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Research competitive analysis',
      description: 'Gather information on top 5 competitors in the market',
      dueDate: '2025-05-25',
      status: 'in-progress',
     
      created: '2025-05-16T14:20:00Z'
    },
    {
      id: '3',
      title: 'Design user flow diagrams',
      description: 'Create user journey maps and wireframes for the new feature',
      dueDate: '2025-05-22',
      status: 'in-progress',
      
      created: '2025-05-17T09:15:00Z'
    },
    {
      id: '4',
      title: 'Update documentation',
      description: 'Review and update all technical documentation for the API',
      dueDate: '2025-05-28',
      status: 'pending',
      
      created: '2025-05-18T16:45:00Z'
    },
    {
      id: '5',
      title: 'Weekly team meeting',
      description: 'Discuss project progress and address any blockers',
      dueDate: '2025-05-21',
      status: 'completed',
      
      created: '2025-05-19T11:00:00Z'
    },
  ];
  

  const generateMoreTasks = (startIndex) => {
    return Array(5).fill().map((_, i) => ({
      id: `${startIndex + i + 1}`,
      title: `Task ${startIndex + i + 1}`,
      description: `Generated task ${startIndex + i + 1}`,
      dueDate: '2025-06-15',
      status: ['pending', 'in-progress', 'completed'][Math.floor(Math.random() * 3)],
      created: new Date().toISOString()
    }));
  };

  const loadMoreTasks = () => {
    setLoading(true);
    setTimeout(() => {
      const newTasks = generateMoreTasks(tasks.length);
      setTasks(prev => [...prev, ...newTasks]);
      if (tasks.length + newTasks.length >= 30) setHasMore(false); // Limit to 30 tasks
      setLoading(false);
    }, 500);
  };

  const lastTaskElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMoreTasks();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Initial load
  useEffect(() => {
    setTasks([]);
    setHasMore(true);
    setLoading(true);
    setTimeout(() => {
      setTasks(generateMoreTasks(0));
      setLoading(false);
    }, 500);
  }, [filter, searchQuery]);

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status !== filter) return false;
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

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
            {filteredTasks.map((task, index) => {
              if (index === filteredTasks.length - 1) {
                return (
                  <div ref={lastTaskElementRef} key={task.id}>
                    <TaskCard
                      task={task}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteTask}
                    />
                  </div>
                );
              } else {
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                  />
                );
              }
            })}
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