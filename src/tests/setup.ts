import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

import { iconMocks } from './mocks/Icon'
import { server } from './mocks/server'

vi.mock('@heroicons/react/24/outline', () => iconMocks())

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

afterEach(() => {
    cleanup()
})
