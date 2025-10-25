import { vi } from 'vitest'

export const useDeleteToolAction = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
