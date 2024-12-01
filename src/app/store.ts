import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import themeReducer from '../features/theme/themeSlice'
import { apiSlice } from '../features/api/apiSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
