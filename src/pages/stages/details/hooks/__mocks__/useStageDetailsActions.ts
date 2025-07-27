import { vi } from 'vitest'

export const useStageDetailsActions = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
