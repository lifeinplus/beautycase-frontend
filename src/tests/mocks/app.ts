import { vi } from 'vitest'
import { useAppDispatch } from '../../app/hooks'

export const mockDispatch = vi.fn()

vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)

export const mockApp = () => {
    vi.mock('../../app/hooks', () => ({
        useAppDispatch: vi.fn(),
        useAppSelector: vi.fn(),
    }))
}
