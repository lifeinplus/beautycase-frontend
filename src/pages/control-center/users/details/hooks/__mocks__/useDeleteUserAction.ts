import { vi } from 'vitest'

export const useDeleteUserAction = vi.fn(() => [
    {
        key: 'back',
        label: 'Back',
        onClick: vi.fn(),
    },
])
