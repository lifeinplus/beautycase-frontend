import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'

import { mockIcons } from './mocks/Icon'
import { server } from './mocks/server'
import { mockReactRouterDom } from './mocks/router'

mockIcons()
mockReactRouterDom()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

beforeEach(() => {
    vi.clearAllMocks()
})

afterEach(() => {
    cleanup()
})
