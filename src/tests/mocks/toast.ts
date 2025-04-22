import { vi } from 'vitest'

const mockToast = () => {
    vi.mock('react-hot-toast', () => ({
        default: {
            success: vi.fn(),
            error: vi.fn(),
        },
    }))
}

export default mockToast
