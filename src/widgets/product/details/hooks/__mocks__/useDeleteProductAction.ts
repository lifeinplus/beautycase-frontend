import { vi } from 'vitest'

export const useDeleteProductAction = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
