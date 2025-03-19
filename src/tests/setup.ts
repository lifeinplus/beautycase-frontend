import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'

import { mockApi } from './mocks/api'
import { mockAuth } from './mocks/auth'
import { mockHooks } from './mocks/hooks'
import { mockIcons } from './mocks/icons'
import { mockReactRouterDom } from './mocks/router'
import { server } from './mocks/server'

export const mockedScrollTo = vi.fn()

mockApi()
mockAuth()
mockHooks()
mockIcons()
mockReactRouterDom()

beforeAll(() => {
    server.listen()
})

beforeEach(() => {
    window.scrollTo = mockedScrollTo
    vi.clearAllMocks()
})

afterEach(() => {
    server.resetHandlers()
    cleanup()
})

afterAll(() => {
    server.close()
})
