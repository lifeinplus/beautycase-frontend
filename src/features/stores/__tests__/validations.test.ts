import { describe, it, expect } from 'vitest'

import { mockStore } from '../../../mocks'
import { storeSchema } from '../validations'

describe('storeSchema validation', () => {
    it('should validate correct data', async () => {
        const data = { ...mockStore }
        await expect(storeSchema.validate(data)).resolves.toEqual(data)
    })

    it('should validate with additional properties', async () => {
        const data = { ...mockStore, address: '123 Main St' }
        await expect(storeSchema.validate(data)).resolves.toEqual(data)
    })

    it('should fail when name is missing', async () => {
        const data = { ...mockStore, name: undefined }
        await expect(storeSchema.validate(data)).rejects.toThrow(
            'Укажите название магазина'
        )
    })

    it('should fail when name is an empty string', async () => {
        const data = { ...mockStore, name: '' }
        await expect(storeSchema.validate(data)).rejects.toThrow(
            'Укажите название магазина'
        )
    })

    it('should fail when name is not a string', async () => {
        const data = { ...mockStore, name: 123 }
        await expect(storeSchema.validate(data)).rejects.toThrow()
    })
})
