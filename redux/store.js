import { configureStore } from '@reduxjs/toolkit';
import { newsReducer } from '../reducers/newsSlice';
import { crossfitDaysReducer } from '../reducers/crossfitDaysSlice';
import { crossfitWorkoutsReducer } from '../reducers/crossfitWorkoutsSlice';
import { gymDaysReducer } from '../reducers/gymDaysSlice';
import { gymWorkoutsReducer } from '../reducers/gymWorkoutsSlice';
import { userLogDataReducer } from '../reducers/userSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        crossfitDays: crossfitDaysReducer,
        crossfitWorkouts: crossfitWorkoutsReducer,
        gymDays: gymDaysReducer,
        gymWorkouts: gymWorkoutsReducer,
        userLogData: userLogDataReducer
    }
})