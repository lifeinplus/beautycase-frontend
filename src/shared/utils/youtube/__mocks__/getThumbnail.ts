import { vi } from 'vitest'

export const getThumbnail = vi.fn(
    (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`
)
