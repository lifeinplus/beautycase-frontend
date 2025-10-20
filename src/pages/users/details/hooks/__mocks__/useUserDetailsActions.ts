import { vi } from 'vitest'

export const useUserDetailsActions = vi.fn(() => [
    {
        key: 'back',
        label: 'Back',
        onClick: vi.fn(),
    },
])
