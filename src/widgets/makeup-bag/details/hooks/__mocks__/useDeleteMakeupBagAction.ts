import { vi } from 'vitest'

export const useDeleteMakeupBagAction = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
