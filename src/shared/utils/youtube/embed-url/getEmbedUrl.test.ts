import { describe, expect, it } from 'vitest'

import { getEmbedUrl } from './getEmbedUrl'

describe('getEmbedUrl', () => {
    it('extracts YouTube video ID correctly', () => {
        const urls = [
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'https://youtu.be/dQw4w9WgXcQ',
            'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'https://www.youtube.com/v/dQw4w9WgXcQ',
            'https://www.youtube.com/e/dQw4w9WgXcQ',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
        ]

        urls.forEach((url) => {
            expect(getEmbedUrl(url)).toBe(
                'https://www.youtube.com/embed/dQw4w9WgXcQ'
            )
        })
    })

    it('returns undefined for invalid URL', () => {
        expect(getEmbedUrl('invalid-url')).toBeUndefined()
    })
})
