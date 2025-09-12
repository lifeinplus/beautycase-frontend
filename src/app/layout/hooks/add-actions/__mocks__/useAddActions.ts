import { vi } from 'vitest'

export const useAddActions = vi.fn(() => [
    {
        key: 'add',
        label: 'Add',
        onClick: vi.fn(),
    },
])
