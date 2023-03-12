import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from '../shared/baseUrl';

export const fetchSingUpData = createAsyncThunk(
    "users/signup",
    async (userCredentials) => {
        const { username, password } = userCredentials
        const response = await fetch(baseUrl + 'users/signup', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            console.log(response.status)
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data
    }
)

export const fetchLogInData = createAsyncThunk(
    "users/login",
    async (userCredentials) => {
        const { username, password } = userCredentials
        const response = await fetch(baseUrl + 'users/login', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            console.log(response.status)
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        console.log('Response Data from fetchLoginData: ', data)
        return data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: { errMess: null, userInfo: [] },
    reducers: {},
    extraReducers: {
        [fetchSingUpData.fulfilled]: (state, action) => {
            state.errMess = null;
            state.userInfo = action.payload;
        },
        [fetchSingUpData.rejected]: (state, action) => {
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
})

const userLogInSlice = createSlice({
    name: 'userLogIn',
    initialState: {logged: false, errMess: null, userLogData: {status: '', success: false, token: ''}},
    reducers: {},
    extraReducers: {
        [fetchLogInData.fulfilled]: (state, action) => {
            state.errMess = null;
            state.logged = true; 
            state.userLogData = action.payload;
        },
        [fetchLogInData.rejected]: (state, action) => {
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
})

export const userInfoReducer = userSlice.reducer;
export const userLogDataReducer = userLogInSlice.reducer;