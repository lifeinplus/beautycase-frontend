import { FieldError } from 'react-hook-form'
import { vi } from 'vitest'

export const mockFieldError: FieldError = {
    message: 'This field is required',
    type: 'required',
}

export const mockFile = new File(['image'], 'image.png', { type: 'image/png' })

export const mockUrl = 'https://example.com/image.jpg'
export const mockUrlYouTube = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

export const mockClearErrors = vi.fn()
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
