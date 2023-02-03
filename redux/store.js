import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '../reducers/newsSlice';
import { crossfitDaysReducer } from '../reducers/crossfitDaysSlice';
import { crossfitWorkoutsReducer } from '../reducers/crossfitWorkoutsSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        crossfitDays: crossfitDaysReducer,
        crossfitWorkouts: crossfitWorkoutsReducer
    }
})