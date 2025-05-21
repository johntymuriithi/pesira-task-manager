import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/types/hooksTypes";
import { RootState } from "@/store/store";
import { Task } from "@/types/Task";

type TaskStatus = "Pending" | "Completed" | "In_progress";
const API_BASE_URL = 'http://localhost:8080/api'

export interface TasksState {
  tasks: Task[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  filterStatus: TaskStatus | 'ALL';
}

// Define payload types for API requests
export interface CreateTaskPayload {
  title: string;
  description: string;
  date: string;
  status: TaskStatus;
  token: string;
}

export interface UpdateTaskPayload {
  id: number;
  title?: string;
  description?: string;
  date?: string;
  status?: TaskStatus;
  token: string;
}

export interface DeleteTaskPayload {
  id: number;
  token: string;
}

export interface CompleteTaskPayload {
  id: number;
  token: string;
}

// Define the initial state
const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
  filterStatus: 'ALL'
};

// Async thunks for API calls
export const fetchAllTasks = createAppAsyncThunk<Task[], string>('tasks/fetchAll', async (token) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const data = await response.json();
  return data.tasks;
});

export const createTask = createAppAsyncThunk<Task, CreateTaskPayload>('tasks/create', 
  async (data, { rejectWithValue }) => {
    const { token, ...taskData } = data;
    console.log(taskData)
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
});

export const updateTask = createAppAsyncThunk<Task, UpdateTaskPayload>('tasks/update', 
  async (data, { rejectWithValue }) => {
    const { token, id, ...updateData } = data;
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
});

export const deleteTask = createAppAsyncThunk<number, DeleteTaskPayload>('tasks/delete', 
  async (data, { rejectWithValue }) => {
    const { token, id } = data;
    console.log(id, token)
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
});

export const completeTask = createAppAsyncThunk<Task, CompleteTaskPayload>('tasks/complete', 
  async (data, { rejectWithValue }) => {
    const { token, id } = data;
    console.log(id, token)
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
});

// Create the tasks slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilterStatus(state, action: PayloadAction<TaskStatus | 'ALL'>) {
      state.filterStatus = action.payload;
    },
    clearTasksErrors(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      // Create task
      .addCase(createTask.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create task';
      })
      
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update task';
      })
      
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete task';
      })
      
      // Complete task
      .addCase(completeTask.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(completeTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to complete task';
      });
  },
});

export const { setFilterStatus, clearTasksErrors } = tasksSlice.actions;

// Selectors
export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectTaskById = (state: RootState, taskId: number) => 
  state.tasks.tasks.find(task => task.id === taskId);
export const selectTasksStatus = (state: RootState) => state.tasks.status;
export const selectTasksError = (state: RootState) => state.tasks.error;
export const selectFilterStatus = (state: RootState) => state.tasks.filterStatus;
export const selectFilteredTasks = (state: RootState) => {
  const filter = state.tasks.filterStatus;
  return filter === 'ALL' 
    ? state.tasks.tasks 
    : state.tasks.tasks.filter(task => task.status === filter);
};

export default tasksSlice.reducer;