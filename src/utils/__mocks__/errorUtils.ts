import { vi } from 'vitest'

export const mockError = new Error('Test Error')

export const getErrorMessage = vi.fn((error) => error.message)
