import { vi } from 'vitest'

export const useMakeupBagDetailsActions = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
