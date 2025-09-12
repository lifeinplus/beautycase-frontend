import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AuthState } from '../types'

const initialState: AuthState = {}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
        setCredentials: (_, action: PayloadAction<AuthState>) => action.payload,
    },
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectRole: (state) => state.role,
        selectUserId: (state) => state.userId,
        selectUsername: (state) => state.username,
    },
})

export const { logout, setCredentials } = authSlice.actions

export const { selectAccessToken, selectRole, selectUserId, selectUsername } =
    authSlice.selectors

export default authSlice.reducer
