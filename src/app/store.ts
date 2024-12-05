import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '../features/api/apiSlice'
import authReducer from '../features/auth/authSlice'
import themeReducer from '../features/theme/themeSlice'

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    theme: themeReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
