import { vi } from 'vitest'

export const useDeleteStageAction = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
