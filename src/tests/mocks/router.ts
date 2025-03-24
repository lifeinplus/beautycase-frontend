import { useLocation, useNavigate } from 'react-router-dom'
import { vi } from 'vitest'

export const mockLocation = {
    pathname: '/test-page',
    search: '',
    hash: '',
    state: { scrollId: '123' },
    key: 'default',
}

export const mockNavigate = vi.fn()

vi.mocked(useLocation).mockReturnValue(mockLocation)
vi.mocked(useNavigate).mockReturnValue(mockNavigate)

export const mockRouter = () => {
    vi.mock('react-router-dom', async (importOriginal) => {
        const actual = await importOriginal()

        return {
            ...(actual as object),
            useLocation: vi.fn(),
            useNavigate: vi.fn(),
        }
    })
}
