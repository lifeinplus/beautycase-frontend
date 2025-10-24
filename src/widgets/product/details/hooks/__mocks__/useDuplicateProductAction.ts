import { vi } from 'vitest'

export const useDuplicateProductAction = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
