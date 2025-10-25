import { vi } from 'vitest'

export const useDeleteLessonAction = vi.fn(() => [
    {
        key: 'edit',
        label: 'Edit',
        onClick: vi.fn(),
    },
])
