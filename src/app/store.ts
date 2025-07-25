import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from '@/features/auth/authSlice'
import formReducer from '@/features/form/formSlice'
import themeReducer from '@/features/theme/themeSlice'
import { api } from '@/shared/api/api'
import config from './config'

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    form: formReducer,
    theme: themeReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        devTools: !config.prod,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
