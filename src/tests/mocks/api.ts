import { vi } from 'vitest'

export const mockApi = () => {
    vi.mock('../../features/api', async (importOriginal) => {
        const actual = await importOriginal()

        return {
            ...(actual as object),

            axiosClient: {
                get: vi.fn(),
            },
        }
    })
}
