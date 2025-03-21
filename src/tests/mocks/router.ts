import { useLocation, useNavigate } from 'react-router-dom'
import { vi } from 'vitest'

export const mockedLocation = {
    pathname: '/test-page',
    search: '',
    hash: '',
    state: { scrollId: '123' },
    key: 'default',
}

export const mockedNavigate = vi.fn()

vi.mocked(useLocation).mockReturnValue(mockedLocation)
vi.mocked(useNavigate).mockReturnValue(mockedNavigate)

export const mockReactRouterDom = () => {
    vi.mock('react-router-dom', async (importOriginal) => {
        const actual = await importOriginal()

        return {
            ...(actual as object),
            useLocation: vi.fn(),
            useNavigate: vi.fn(),
        }
    })
}
