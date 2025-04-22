import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { vi } from 'vitest'

export const mockLocation = {
    pathname: '/test-pathname',
    search: '',
    hash: '',
    state: { scrollId: '123' },
    key: 'default',
}

export const mockNavigate = vi.fn()

vi.mocked(useLocation).mockReturnValue(mockLocation)
vi.mocked(useNavigate).mockReturnValue(mockNavigate)
vi.mocked(useParams).mockReturnValue({ id: '123' })

const mockRouter = () => {
    vi.mock('react-router-dom', async (importOriginal) => {
        const actual = await importOriginal()
        return {
            ...(actual as object),
            useLocation: vi.fn(),
            useNavigate: vi.fn(),
            useParams: vi.fn(),
        }
    })
}

export default mockRouter
