import { vi } from 'vitest'

export const useProductDetailsActions = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
