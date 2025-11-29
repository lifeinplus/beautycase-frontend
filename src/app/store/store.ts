import { combineReducers, configureStore } from '@reduxjs/toolkit'

import modalsReducer from '@/app/ui/modals/modalsSlice'
import themeReducer from '@/app/ui/theme/themeSlice'
import authReducer from '@/features/auth/slice/authSlice'
import formReducer from '@/features/form/slice/formSlice'
import { api } from '@/shared/api/api'
import config from '../config/config'

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    form: formReducer,
    modals: modalsReducer,
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
