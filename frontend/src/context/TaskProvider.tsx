import { useContext, useEffect, useState } from 'react';
import { TaskContext } from './TaskContext';
import UserContext from './UserContext';

export const TaskProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);

  // ✅ Renamed to avoid conflict with global fetch
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.example.com/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Optionally, handle the error state here
      }
    };
  
    fetchTasks();
  }, []);
  

  // ✅ Automatically fetch tasks when user logs in
  useEffect(() => {
    if (user?.token) {
      fetchTasks();
    }
  }, [user]);

  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask , fetchTasks}}
    >
      {children}
    </TaskContext.Provider>
  );
};
