import { vi } from 'vitest'

export const useBackActions = vi.fn(() => [
    {
        key: 'back',
        label: 'Back',
        onClick: vi.fn(),
    },
])
