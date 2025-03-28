import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'

import { mockApi } from './mocks/api'
import { mockApp } from './mocks/app'
import { mockAuth } from './mocks/auth'
import { mockHooks } from './mocks/hooks'
import { mockIcons } from './mocks/icons'
import { mockRouter } from './mocks/router'
import { server } from './mocks/server'

vi.mock('react-hot-toast', async () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

export const mockScrollTo = vi.fn()

mockApi()
mockApp()
mockAuth()
mockHooks()
mockIcons()
mockRouter()

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
