import { useState, useContext } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  List,
  Menu,
  Plus,
  Search,
  Sparkles,
  Star,
  User
} from 'lucide-react';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import { Task } from '@/types/Task';
import { TaskContext } from '@/context/TaskContext';
import UserContext from '@/context/UserContext';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { user } = useContext(UserContext)

  const {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    changeStatus,
    loading
  } = useContext(TaskContext)!;

  const filters = [
    { id: 'all', label: 'All Tasks', icon: List },
    { id: 'pending', label: 'Pending', icon: Clock },
    { id: 'in-progress', label: 'In Progress', icon: Star },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 }
  ];

  const handleAddTask = (newTask: Task) => {
    const taskWithId = { ...newTask, id: Date.now().toString() };
    addTask(taskWithId);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    changeStatus(taskId, newStatus);
  };

  const handleEditTask = (task: Task) => setEditingTask(task);

  const handleUpdateTask = (updatedTask: Task) => {
    console.log("we are getting here")
    updateTask(updatedTask);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-10">
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} h-full bg-gray-900 transition-all duration-300 flex flex-col border-r border-gray-800`}>
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center justify-between h-16 border-b border-gray-800">
              {sidebarOpen ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="text-purple-400" size={20} />
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">TaskNova</span>
                </div>
              ) : (
                <Sparkles className="text-purple-400 mx-auto" size={20} />
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 rounded-md hover:bg-gray-800"
              >
                <Menu size={18} />
              </button>
            </div>

            <div className="flex flex-col flex-grow overflow-hidden p-3">
              <div className="mb-6">
                <button
                  onClick={() => setIsAddTaskModalOpen(true)}
                  className="w-full flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md px-3 py-2 text-sm font-medium"
                >
                  <Plus size={16} />
                  {sidebarOpen && <span>Add New Task</span>}
                </button>
              </div>

              <nav className="space-y-1 overflow-y-auto">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`w-full flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-gray-800 text-purple-400'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <filter.icon size={18} />
                    {sidebarOpen && <span>{filter.label}</span>}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-3 border-t border-gray-800 mt-auto">
              <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'} p-2 rounded-md`}>
                <div className="flex items-center gap-3">
                  {sidebarOpen && (
                    <div className="text-sm">
                      <div className="font-medium">{user.username}</div>
                      <div className="text-gray-400 text-xs">{user.email}</div>
                    </div>
                  )}
                </div>
                {sidebarOpen && <ChevronRight size={16} className="text-gray-500" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        <header className="h-16 border-b border-gray-800 bg-gray-900/70 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
              <User size={18} />
            </button>
          </div>
        </header>

        <main className="overflow-y-auto bg-gray-950 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{filters.find(f => f.id === activeFilter)?.label}</h1>
            <p className="text-gray-400">Manage and organize your tasks efficiently</p>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              filter={activeFilter}
              searchQuery={searchQuery}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onStatusChange={handleStatusChange}
            />
          )}
        </main>
      </div>

      {isAddTaskModalOpen && (
        <AddTaskModal
          onClose={() => setIsAddTaskModalOpen(false)}
          onAdd={handleAddTask}
        />
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onStatusChange={handleStatusChange}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
}
