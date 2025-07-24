import { vi } from 'vitest'

export const useLessonDetailsActions = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
