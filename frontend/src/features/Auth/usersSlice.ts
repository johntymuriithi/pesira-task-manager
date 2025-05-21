import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/types/hooksTypes";
import { Login, SignUp, User } from "@/types/usersTypes";
import { RootState } from "@/store/store";

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

const API_BASE_URL = 'http://localhost:8080/api'; 


const initialState: {
    user: User | null
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    isActive: boolean
    error: string | null;
} = {
    user: null,
    isActive: true,
    status: 'idle',
    error: null,
};

export const loginUser = createAppAsyncThunk('user/loginUser', async (data: Login) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    const info = await response.json()
    return info.data
});

export const signUser = createAppAsyncThunk('user/signUser', async (data: SignUp) => {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to SignUp');
    }

    const info = await response.json()
    return info.data
});

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.isActive = true;
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                state.error = '';
                state.isActive = false
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to login';
            });
    },
});

export const { logOut } = usersSlice.actions
export default usersSlice.reducer;
export const getUserInfo = (state: RootState) => state.user