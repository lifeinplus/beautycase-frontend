import { vi } from 'vitest'

export const mockedNavigate = vi.fn()

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
