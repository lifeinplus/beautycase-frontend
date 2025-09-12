import { vi } from 'vitest'

export const useAppDispatch = vi.fn()
export const useAppSelector = vi.fn()

export const mockDispatch = vi.fn()

vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)
