import { vi } from 'vitest'

export const mockDispatch = vi.fn()

export const mockApp = () => {
    vi.mock('../../app/hooks', () => ({
        useAppDispatch: vi.fn(),
        useAppSelector: vi.fn(),
    }))
}
