import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from '../shared/baseUrl';

export const fetchgymWorkouts = createAsyncThunk(
    'gymWorkouts/fetchgymWorkouts',
    async () => {
        const response = await fetch(baseUrl + 'gymWorkouts');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const gymWorkoutsSlice = createSlice({
    name: 'gymWorkouts',
    initialState: { isLoading: true, errMess: null, gymWorkoutsArray: [] },
    reducers: {},
    extraReducers: {
        [fetchgymWorkouts.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchgymWorkouts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.gymWorkoutsArray = action.payload;
        },
        [fetchgymWorkouts.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
})

export const gymWorkoutsReducer = gymWorkoutsSlice.reducer;