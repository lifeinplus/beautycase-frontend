import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'

import { mockScrollTo } from './mocks'
import mockCloudinary from './mocks/cloudinary'
import mockIcons from './mocks/icons'
import mockRouter from './mocks/router'
import server from './mocks/server'
import mockToast from './mocks/toast'
import mockTranslation from './mocks/translation'

mockCloudinary()
mockIcons()
mockRouter()
mockToast()
mockTranslation()

Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
    },
    writable: true,
})

export const spyConsoleError = vi.spyOn(console, 'error')

beforeAll(() => {
    spyConsoleError.mockImplementation(() => {})
    server.listen()
})

beforeEach(() => {
    window.scrollTo = mockScrollTo
    vi.clearAllMocks()
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    spyConsoleError.mockRestore()
    server.close()
})
