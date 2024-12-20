import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState<T> {
    data: T
    isDirty: boolean
}

const initialState: FormState<any> = { data: {}, isDirty: false }

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        clearFormData: () => initialState,
        setFormData: <T>(state: FormState<T>, action: PayloadAction<T>) => {
            state.data = { ...state.data, ...action.payload }
            state.isDirty = true
        },
    },
    selectors: {
        selectFormData: (state) => state.data,
        selectIsDirty: (state) => state.isDirty,
    },
})

export const { setFormData, clearFormData } = formSlice.actions

export const { selectFormData, selectIsDirty } = formSlice.selectors
