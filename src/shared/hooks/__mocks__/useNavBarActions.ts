import { PlusIcon } from '@heroicons/react/24/outline'
import { vi } from 'vitest'

import { NavBarAction } from '../useNavBarActions'

export const mockActionAdd: NavBarAction = {
    key: 'add',
    label: 'Add',
    icon: PlusIcon,
    onClick: vi.fn(),
}

export const mockActionBack: NavBarAction = {
    key: 'back',
    label: 'Back',
    icon: PlusIcon,
    onClick: vi.fn(),
}

export const mockActionDelete: NavBarAction = {
    key: 'delete',
    label: 'Delete',
    icon: PlusIcon,
    onClick: vi.fn(),
    modalProps: {
        isOpen: true,
        title: 'Confirm Delete',
        description: 'Are you sure?',
        onConfirm: vi.fn(),
        onCancel: vi.fn(),
    },
}

export const useNavBarActions = vi.fn(() => [])
