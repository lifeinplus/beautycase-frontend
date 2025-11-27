import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DuplicateModalState {
    isOpen: boolean
    title: string
    description?: string
    isBlocked: boolean
    isLoading: boolean
}

interface DeleteModalState {
    isOpen: boolean
    title: string
    description?: string
    isBlocked: boolean
    isLoading: boolean
}

interface ModalsState {
    duplicate: DuplicateModalState
    delete: DeleteModalState
}

const initialState: ModalsState = {
    duplicate: {
        isOpen: false,
        title: '',
        description: '',
        isBlocked: false,
        isLoading: false,
    },
    delete: {
        isOpen: false,
        title: '',
        description: '',
        isBlocked: false,
        isLoading: false,
    },
}

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        closeModals: () => initialState,
        openDuplicate(
            state,
            action: PayloadAction<Partial<DuplicateModalState>>
        ) {
            state.duplicate = {
                ...state.duplicate,
                ...action.payload,
                isOpen: true,
            }
        },
        setDuplicateLoading(state, action: PayloadAction<boolean>) {
            state.duplicate.isLoading = action.payload
        },
        openDelete(state, action: PayloadAction<Partial<DeleteModalState>>) {
            state.delete = {
                ...state.delete,
                ...action.payload,
                isOpen: true,
            }
        },
        setDeleteLoading(state, action: PayloadAction<boolean>) {
            state.delete.isLoading = action.payload
        },
    },
    selectors: {
        selectDuplicateModal: (state) => state.duplicate,
        selectDeleteModal: (state) => state.delete,
    },
})

export const {
    closeModals,
    openDuplicate,
    setDuplicateLoading,
    openDelete,
    setDeleteLoading,
} = modalsSlice.actions

export const { selectDuplicateModal, selectDeleteModal } = modalsSlice.selectors

export default modalsSlice.reducer
