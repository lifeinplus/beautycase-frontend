import { vi } from 'vitest'

export const getYouTubeEmbedUrl = vi.fn()

export const getYouTubeThumbnail = vi.fn(
    (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`
)
