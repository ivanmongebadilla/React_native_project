import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from '../shared/baseUrl';

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async () => {
        console.log("Entering fetch")
        const response = await fetch(baseUrl + 'news');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState: { isLoading: true, errMess: null, newsArray: [] },
    reducers: {},
    extraReducers: {
        [fetchNews.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchNews.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.newsArray = action.payload;
        },
        [fetchNews.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
});

export const newsReducer = newsSlice.reducer;