import { vi } from 'vitest'

export const useDuplicateStageAction = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
