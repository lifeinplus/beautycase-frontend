import { describe, it, expect } from 'vitest'

import { mockBrand } from '../__mocks__/brandsApi'
import { brandSchema } from '../validations'

describe('Brand Schema Validation', () => {
    it('should validate correct brand data', async () => {
        const data = { ...mockBrand }
        const result = await brandSchema.validate(data)
        expect(result).toEqual(data)
    })

    it('should fail when name is missing', async () => {
        const data = { ...mockBrand, name: undefined }
        await expect(brandSchema.validate(data)).rejects.toThrow(
            'Укажите название бренда'
        )
    })

    it('should fail when name is empty', async () => {
        const data = { ...mockBrand, name: '' }
        await expect(brandSchema.validate(data)).rejects.toThrow(
            'Укажите название бренда'
        )
    })
})
