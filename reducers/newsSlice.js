import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from '../shared/baseUrl';

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async () => {
        const response = await fetch(baseUrl + 'news');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        if (baseUrl === 'http://192.168.0.233:3001/') { 
            return data;
        } else {
            return data[0].news
        }
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
            //console.log(action.payload)
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