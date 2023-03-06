import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from '../shared/baseUrl';

export const fetchgymDays = createAsyncThunk(
    'gymDays/fetchgymDays',
    async () => {
        const response = await fetch(baseUrl + 'gymDays');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        if (baseUrl === 'http://192.168.0.233:3001/') { 
            return data;
        } else {
            return data[0].gymDays
        }
    }
);

const gymDaysSlice = createSlice({
    name: 'gymDays',
    initialState: { isLoading: true, errMess: null, gymDaysArray: [] },
    reducers: {},
    extraReducers: {
        [fetchgymDays.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchgymDays.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.gymDaysArray = action.payload;
        },
        [fetchgymDays.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
})

export const gymDaysReducer = gymDaysSlice.reducer;