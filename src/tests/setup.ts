import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'

import { mockApi } from './mocks/api'
import { mockApp } from './mocks/app'
import { mockAuth } from './mocks/auth'
import { mockHooks } from './mocks/hooks'
import { mockIcons } from './mocks/icons'
import { mockRouter } from './mocks/router'
import { server } from './mocks/server'

export const mockScrollTo = vi.fn()

mockApi()
mockApp()
mockAuth()
mockHooks()
mockIcons()
mockRouter()

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
