import { combineReducers, configureStore } from '@reduxjs/toolkit'

import config from '../config'
import { apiSlice } from '../features/api/apiSlice'
import authReducer from '../features/auth/authSlice'
import formReducer from '../features/form/formSlice'
import themeReducer from '../features/theme/themeSlice'

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    form: formReducer,
    theme: themeReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
        devTools: !config.prod,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
