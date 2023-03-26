import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GOOGLE_API_KEY } from '../environments';

export const fetchNearestPlaces = createAsyncThunk(
    'nearplaces/fetchNearestPlaces',
    async (locationData) => {
        const {latitude, longitude} = locationData 
        const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=4500&type=gym&key=' + GOOGLE_API_KEY)
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json()
        return data.results
    }
);

const nearestPlacesSlice = createSlice({
    name: 'nearestPlaces',
    initialState: { isLoading: true, errMess: null, nearestPlacesArray: []},
    reducers: {},
    extraReducers: {
        [fetchNearestPlaces.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchNearestPlaces.fulfilled]: (state, action) => {
            state.errMess = null;
            state.isLoading = false;
            state.nearestPlacesArray = action.payload;
        },
        [fetchNearestPlaces.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
})

export const nearestPlacesReducer = nearestPlacesSlice.reducer;