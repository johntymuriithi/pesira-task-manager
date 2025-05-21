import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Star, X } from 'lucide-react';

export default function EditTaskModal({ task, onClose, onStatusChange }) {
  const [editedTask, setEditedTask] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
    priority: task.priority
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!editedTask.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!editedTask.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically call an API to update the task
      console.log('Updating task:', editedTask);
      
      // Update the task's status if it has changed
      if (editedTask.status !== task.status) {
        onStatusChange(task.id, editedTask.status);
      }
      
      // Close modal after successful update
      onClose();
    }
  };
  
  // Format the date to YYYY-MM-DD for the date input
  useEffect(() => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };
    
    setEditedTask(prev => ({
      ...prev,
      dueDate: formatDate(task.dueDate)
    }));
  }, [task.dueDate]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-xl border border-gray-800" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Edit Task</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
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
              value={editedTask.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
              placeholder="Enter task description"
            />
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
                  value={editedTask.dueDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border ${
                    errors.dueDate ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:ring-purple-500/50'
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                />
              </div>
              {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle2 size={16} className="text-gray-400" />
                </div>
                <select
                  name="status"
                  value={editedTask.status}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent appearance-none"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <div className="flex space-x-4">
              {['low', 'medium', 'high'].map((priority) => (
                <label key={priority} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={editedTask.priority === priority}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`flex items-center justify-center h-10 w-10 rounded-full border ${
                    editedTask.priority === priority 
                      ? 'border-transparent ring-2 ring-purple-500 bg-purple-500/20' 
                      : 'border-gray-700 bg-gray-800'
                  }`}>
                    <Star 
                      size={18} 
                      className={`${
                        editedTask.priority === priority ? 'text-purple-400' : 'text-gray-400'
                      } ${
                        priority === 'high' ? 'fill-current' : ''
                      }`} 
                    />
                  </div>
                  <span className="capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-800 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}