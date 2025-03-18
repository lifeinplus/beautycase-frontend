import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'

import { mockIcons } from './mocks/Icon'
import { mockReactRouterDom } from './mocks/router'
import { server } from './mocks/server'

export const mockedScrollTo = vi.fn()

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
