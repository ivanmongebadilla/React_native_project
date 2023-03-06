import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from '../shared/baseUrl';

export const fetchcrossfitWorkouts = createAsyncThunk(
    'crossfitWorkouts/fetchcrossfitWorkouts',
    async () => {
        const response = await fetch(baseUrl + 'crossfitWorkouts');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        if (baseUrl === 'http://192.168.0.233:3001/') { 
            return data;
        } else {
            return data[0].crossfitWorkouts
        }
    }
);

const crossfitWorkoutsSlice = createSlice({
    name: 'crossfitWorkouts',
    initialState: { isLoading: true, errMess: null, crossfitWorkoutsArray: [] },
    reducers: {},
    extraReducers: {
        [fetchcrossfitWorkouts.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchcrossfitWorkouts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.crossfitWorkoutsArray = action.payload;
        },
        [fetchcrossfitWorkouts.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
})

export const crossfitWorkoutsReducer = crossfitWorkoutsSlice.reducer;