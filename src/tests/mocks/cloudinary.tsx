import { vi } from 'vitest'

const mockCloudinary = () => {
    vi.mock('@cloudinary/react', () => ({
        AdvancedImage: () => <img data-testid="mocked-advanced-image" />,
    }))
}

export default mockCloudinary
