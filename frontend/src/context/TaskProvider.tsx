import { useContext, useEffect, useState } from 'react';
import { TaskContext } from './TaskContext';
import UserContext from './UserContext';

export const TaskProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);

  // ✅ Renamed to avoid conflict with global fetch
  
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tasks", {
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const data = await response.json();
  setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Optionally, handle the error state here
      }
    };



  

  // ✅ Automatically fetch tasks when user logs in
  useEffect(() => {
    if (user?.token) {
      fetchTasks();
      console.log(tasks)
    }
  }, [user]);

  console.log('Tasks:', tasks);

  const addTask = async (task) => {
    console.log('Adding task:', task);
    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      // Optionally, handle the error state here  
    }
  };

  const updateTask = async (task) => {
  console.log('Updating task:', task);
    try {
    
    const response = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }

    const updatedTask = await response.json();
    console.log('Updated task:', updatedTask);
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error.message);
    // Optional: show toast or update UI state
  }
};


  const deleteTask = async (id) => {
    console.log('Deleting task:', id);
  try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return id;
    } catch (error) {
      console.error('Error deleting task:', error);
      // Optionally, handle the error state here
    }
  };

  const changeStatus = async (id, status) => {
    console.log('Changing status of task:', id, status);
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      console.error('Error changing task status:', error);
      // Optionally, handle the error state here
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask , fetchTasks, changeStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
};