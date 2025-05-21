import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Edit,
  Star,
  Trash2,
  Calendar,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react';
import EditTaskModal from './EditTaskModal';

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysRemaining = calculateDaysRemaining();
  
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Status badge styles
  const getStatusBadge = () => {
    switch(task.status) {
      case 'pending':
        return (
          <div className="flex items-center gap-1.5 text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full text-xs font-medium">
            <Clock size={12} />
            <span>Pending</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center gap-1.5 text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full text-xs font-medium">
            <Star size={12} />
            <span>In Progress</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center gap-1.5 text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full text-xs font-medium">
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Priority badge styles
  const getPriorityBadge = () => {
    switch(task.priority) {
      case 'low':
        return (
          <div className="text-gray-400 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>Low</span>
          </div>
        );
      case 'medium':
        return (
          <div className="text-blue-400 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>Medium</span>
          </div>
        );
      case 'high':
        return (
          <div className="text-red-400 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            <span>High</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      <div className="bg-gradient-to-b from-gray-900 to-gray-900/70 border border-gray-800 rounded-lg shadow-md p-4 hover:border-gray-700 transition-colors group">
        <div className="flex justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2 gap-2">
              {getStatusBadge()}
              {getPriorityBadge()}
            </div>
            <h3 className="font-medium mb-1 text-lg line-clamp-1">{task.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{task.description}</p>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar size={14} />
                <span>Due: {formatDate(task.dueDate)}</span>
                
                {task.status !== 'completed' && daysRemaining >= 0 && (
                  <span className={`ml-2 ${
                    daysRemaining <= 1 ? 'text-red-400' : 
                    daysRemaining <= 3 ? 'text-yellow-400' : 
                    'text-gray-400'
                  }`}>
                    ({daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left)
                  </span>
                )}
                
                {task.status !== 'completed' && daysRemaining < 0 && (
                  <span className="ml-2 text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    Overdue
                  </span>
                )}
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <MoreHorizontal size={16} className="text-gray-400" />
                </button>
                
                {showOptions && (
                  <div className="absolute z-10 right-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1">
                    {task.status !== 'completed' && (
                      <button 
                        onClick={() => {
                          onStatusChange(task.id, 'completed');
                          setShowOptions(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                      >
                        <CheckCircle2 size={16} className="text-green-400" />
                        <span>Mark as Completed</span>
                      </button>
                    )}
                    
                    {task.status === 'completed' && (
                      <button 
                        onClick={() => {
                          onStatusChange(task.id, 'pending');
                          setShowOptions(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                      >
                        <Clock size={16} className="text-yellow-400" />
                        <span>Mark as Pending</span>
                      </button>
                    )}
                    
                    {task.status !== 'in-progress' && task.status !== 'completed' && (
                      <button 
                        onClick={() => {
                          onStatusChange(task.id, 'in-progress');
                          setShowOptions(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                      >
                        <Star size={16} className="text-blue-400" />
                        <span>Mark as In Progress</span>
                      </button>
                    )}
                    
                    <button 
                      onClick={() => {
                        setShowEditModal(true);
                        setShowOptions(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                    >
                      <Edit size={16} className="text-purple-400" />
                      <span>Edit Task</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        onDelete(task.id);
                        setShowOptions(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors text-red-400"
                    >
                      <Trash2 size={16} />
                      <span>Delete Task</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showEditModal && (
        <EditTaskModal 
          task={task} 
          onClose={() => setShowEditModal(false)} 
          onStatusChange={onStatusChange}
        />
      )}
    </>
  );
}