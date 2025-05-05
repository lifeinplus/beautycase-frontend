import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'

import { mockScrollTo } from './mocks'
import mockCloudinary from './mocks/cloudinary'
import mockIcons from './mocks/icons'
import mockRouter from './mocks/router'
import server from './mocks/server'
import mockToast from './mocks/toast'

mockCloudinary()
mockIcons()
mockRouter()
mockToast()

Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
    },
    writable: true,
})

beforeAll(() => {
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
    server.close()
})
