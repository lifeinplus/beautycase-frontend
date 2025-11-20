import { FieldError } from 'react-hook-form'
import { vi } from 'vitest'

export const mockFieldError: FieldError = {
    message: 'This field is required',
    type: 'required',
}

export const mockFile = new File(['image'], 'image.png', { type: 'image/png' })

export const mockImageId =
    'products/691c27584e28a506f9bdaebc/mijmxrn4ivqfbmdzwt5m'

export const mockImageUrl1 = 'https://example.com/image1.jpg'
export const mockImageUrl2 = 'https://example.com/image2.jpg'
export const mockYouTubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

export const mockClearErrors = vi.fn()
export const mockOnSubmit = vi.fn()
export const mockSetValue = vi.fn()

export const mockRegister = {
    name: 'testName',
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
}

export const mockRegisterVideo = {
    name: 'videoUrl',
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
}
