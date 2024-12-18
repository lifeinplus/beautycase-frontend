import { combineSlices, configureStore } from '@reduxjs/toolkit'

import config from '../config'
import { apiSlice } from '../features/api'
import { authSlice } from '../features/auth'
import { formSlice } from '../features/form'
import { themeSlice } from '../features/theme'

const rootReducer = combineSlices(apiSlice, authSlice, formSlice, themeSlice)

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !config.prod,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
