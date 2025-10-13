import { vi } from 'vitest'

export const useNavBarActions = vi.fn(() => [
    {
        key: 'add',
        icon: vi.fn(),
        label: 'Add',
        onClick: vi.fn(),
    },
    {
        key: 'delete',
        icon: vi.fn(),
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
    {
        key: 'duplicate',
        icon: vi.fn(),
        label: 'Duplicate',
        onClick: vi.fn(),
        modalProps: {
            isOpen: true,
            title: 'Confirm Duplicate',
            description: 'Are you sure?',
            onConfirm: vi.fn(),
            onCancel: vi.fn(),
        },
    },
])
