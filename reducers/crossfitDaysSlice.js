import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from '../shared/baseUrl';

export const fetchcrossfitDays = createAsyncThunk(
    'crossfitDays/fetchcrossfitDays',
    async () => {
        const response = await fetch(baseUrl + 'crossfitDays');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        if (baseUrl === 'http://192.168.0.233:3001/') { 
            return data;
        } else {
            return data[0].crossfitDays
        }
    }
);

const crossfitDaysSlice = createSlice({
    name: 'crossfitDays',
    initialState: { isLoading: true, errMess: null, crossfitDaysArray: [] },
    reducers: {},
    extraReducers: {
        [fetchcrossfitDays.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchcrossfitDays.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.crossfitDaysArray = action.payload;
        },
        [fetchcrossfitDays.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
})

export const crossfitDaysReducer = crossfitDaysSlice.reducer;