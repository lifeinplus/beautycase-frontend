import { vi } from 'vitest'

export const useToolDetailsActions = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
