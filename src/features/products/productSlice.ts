import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductState {
    selectedProductIds: string[]
}

const initialState: ProductState = {
    selectedProductIds: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSelectedProductIds: () => initialState,
        setSelectedProductIds: (state, action: PayloadAction<string[]>) => {
            state.selectedProductIds = action.payload
        },
        toggleProductSelection: (state, action: PayloadAction<string>) => {
            if (state.selectedProductIds.some((id) => id === action.payload)) {
                state.selectedProductIds = state.selectedProductIds.filter(
                    (id) => id !== action.payload
                )
            } else {
                state.selectedProductIds = [
                    ...state.selectedProductIds,
                    action.payload,
                ]
            }
        },
    },
    selectors: {
        selectSelectedProductIds: (state) => state.selectedProductIds,
    },
})

export const {
    clearSelectedProductIds,
    setSelectedProductIds,
    toggleProductSelection,
} = productSlice.actions

export const { selectSelectedProductIds } = productSlice.selectors
