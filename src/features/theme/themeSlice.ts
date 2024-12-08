import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
    darkMode: boolean
}

const initialState: ThemeState = {
    darkMode: localStorage.getItem('darkMode') === 'true',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode
        },
    },
    selectors: {
        selectDarkMode: (state) => state.darkMode,
    },
})

export const { toggleTheme } = themeSlice.actions
export const { selectDarkMode } = themeSlice.selectors
