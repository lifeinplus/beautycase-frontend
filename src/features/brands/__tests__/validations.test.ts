import { describe, it, expect } from 'vitest'

import { mockBrand1 } from '../__mocks__/brandsApi'
import { brandSchema } from '../validations'

describe('Brand Schema Validation', () => {
    it('should validate correct brand data', async () => {
        const data = { ...mockBrand1 }
        const result = await brandSchema.validate(data)
        expect(result).toEqual(data)
    })

    it('should fail when name is missing', async () => {
        const data = { ...mockBrand1, name: undefined }
        await expect(brandSchema.validate(data)).rejects.toThrow(
            'validations.name'
        )
    })

    it('should fail when name is empty', async () => {
        const data = { ...mockBrand1, name: '' }
        await expect(brandSchema.validate(data)).rejects.toThrow(
            'validations.name'
        )
    })
})
