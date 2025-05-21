import { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Star, X } from 'lucide-react';


type AddTaskModalProps = {
  onClose: () => void;
};

export default function AddTaskModal({ onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('pending');

  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!date) newErrors.dueDate = 'Due date is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTc0NzgyNzQwMiwiZXhwIjoxNzQ3OTEzODAyfQ.dLgY_oB7mBIWEdNep9Urkqd9FMqtLcYPgJNdwl8kKGDXrwN6u1AMaf-s_Mh4Si9ynNdxp9Dk7u2Pxt94p6Dxcg';

    // try {
    //   await dispatch(
    //     createTask({ title, description, date, status, token })
    //   ).unwrap();
    //   alert('Task created successfully');
    //   navigate('/');
    //   onClose();
    // } catch (err) {
    //   console.error('Error creating task:', err);
    // }
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-gray-400" />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border ${
                  errors.dueDate ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-700 focus:ring-purple-500/50'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
            </div>
            {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Pending', icon: <Clock size={16} />, value: 'Pending', color: 'yellow' },
                { label: 'In Progress', icon: <Star size={16} />, value: 'In_progress', color: 'blue' },
                { label: 'Completed', icon: <CheckCircle2 size={16} />, value: 'Completed', color: 'green' },
              ].map(({ label, icon, value, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border ${
                    status === value
                      ? `bg-${color}-400/10 border-${color}-400/30 text-${color}-400`
                      : 'border-gray-700 hover:bg-gray-800'
                  } transition-colors`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
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
