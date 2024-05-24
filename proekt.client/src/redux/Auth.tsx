import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginPeople {
    id: number;
    name: string;
    login: string;
    password: string;
    phone: string;
    adress: string;
    email: string;
    job_title: string;
}

export interface CounterState {
    isAdmin: boolean | null;
    isLogin: boolean;
    Token: string;
    User: LoginPeople | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CounterState = {
    isAdmin: null,
    isLogin: false,
    Token: "",
    User: null,
    status: 'idle',
    error: null,
};

export const fetchData = createAsyncThunk(
    'auth/fetchData',
    async (thunkAPI) => {
        try {
            const response = await axios.get(`https://localhost:7244/api/Auth/loginPeople`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isLogin = true;
            state.Token = action.payload;
            console.log('Logged in with token:', state.Token);
        },
        logPeople: (state, action: PayloadAction<string>) => {
            console.log('Payload received:', action.payload);
            if (action.payload === "admin") {
                state.isAdmin = true;
            }
            console.log('User data:', state.isAdmin);
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<LoginPeople>) => {
                state.status = 'succeeded';
                state.User = action.payload;
                console.log('Fetched user data:', state.User);
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch user data';
                console.error('Fetch error:', state.error);
            });
    },
});

export const { login, logPeople } = authSlice.actions;
export default authSlice.reducer;
