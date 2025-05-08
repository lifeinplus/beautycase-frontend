import { vi } from 'vitest'

const mockToast = () => {
    vi.mock('react-hot-toast', () => ({
        default: {
            success: vi.fn(),
            error: vi.fn(),
        },
        Toaster: () => <div data-testid="mocked-toaster" />,
    }))
}

export default mockToast
