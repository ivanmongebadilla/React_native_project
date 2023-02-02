import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '../reducers/newsSlice';
import { crossfitDaysReducer } from '../reducers/crossfitDaysSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        crossfitDays: crossfitDaysReducer
    }
})