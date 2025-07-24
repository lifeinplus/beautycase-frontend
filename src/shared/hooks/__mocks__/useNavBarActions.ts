import { vi } from 'vitest'

export const useNavBarActions = vi.fn(() => [
    {
        key: 'add',
        label: 'Add',
        onClick: vi.fn(),
    },
    {
        key: 'delete',
        label: 'Delete',
        onClick: vi.fn(),
        modalProps: {
            isOpen: true,
            title: 'Confirm Delete',
            description: 'Are you sure?',
            onConfirm: vi.fn(),
            onCancel: vi.fn(),
        },
    },
])
