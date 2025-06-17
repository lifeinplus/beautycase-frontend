import { describe, it, expect } from 'vitest'

import { mockStore1 } from '../__mocks__/storesApi'
import { storeSchema } from '../validations'

describe('storeSchema validation', () => {
    it('should validate correct data', async () => {
        const data = { ...mockStore1 }
        await expect(storeSchema.validate(data)).resolves.toEqual(data)
    })

    it('should validate with additional properties', async () => {
        const data = { ...mockStore1, address: '123 Main St' }
        await expect(storeSchema.validate(data)).resolves.toEqual(data)
    })

    it('should fail when name is missing', async () => {
        const data = { ...mockStore1, name: undefined }
        await expect(storeSchema.validate(data)).rejects.toThrow(
            'Укажите название магазина'
        )
    })

    it('should fail when name is an empty string', async () => {
        const data = { ...mockStore1, name: '' }
        await expect(storeSchema.validate(data)).rejects.toThrow(
            'Укажите название магазина'
        )
    })

    it('should fail when name is not a string', async () => {
        const data = { ...mockStore1, name: 123 }
        await expect(storeSchema.validate(data)).rejects.toThrow()
    })
})
