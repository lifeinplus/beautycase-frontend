import { vi } from 'vitest'

const cloudinary = {
    image: vi.fn().mockReturnValue({
        resize: () => ({
            format: () => ({
                quality: () => ({}),
            }),
        }),
    }),
}

export default cloudinary
