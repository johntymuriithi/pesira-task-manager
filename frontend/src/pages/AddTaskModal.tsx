import { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Star, X } from 'lucide-react';

export default function AddTaskModal({ onClose }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium'
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!task.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically call an API to save the task
      console.log('Saving task:', task);
      
      // Close modal after successful save
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-xl border border-gray-800" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${
                errors.title ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:ring-purple-500/50'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="Enter task title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
              placeholder="Enter task description"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border ${
                    errors.dueDate ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:ring-purple-500/50'
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                />
              </div>
              {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setTask(prev => ({ ...prev, status: 'pending' }))}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border ${
                  task.status === 'pending' 
                  ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' 
                  : 'border-gray-700 hover:bg-gray-800'
                } transition-colors`}
              >
                <Clock size={16} />
                <span>Pending</span>
              </button>
              
              <button
                type="button"
                onClick={() => setTask(prev => ({ ...prev, status: 'in-progress' }))}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border ${
                  task.status === 'in-progress' 
                  ? 'bg-blue-400/10 border-blue-400/30 text-blue-400' 
                  : 'border-gray-700 hover:bg-gray-800'
                } transition-colors`}
              >
                <Star size={16} />
                <span>In Progress</span>
              </button>
              
              <button
                type="button"
                onClick={() => setTask(prev => ({ ...prev, status: 'completed' }))}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border ${
                  task.status === 'completed' 
                  ? 'bg-green-400/10 border-green-400/30 text-green-400' 
                  : 'border-gray-700 hover:bg-gray-800'
                } transition-colors`}
              >
                <CheckCircle2 size={16} />
                <span>Completed</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all font-medium"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}