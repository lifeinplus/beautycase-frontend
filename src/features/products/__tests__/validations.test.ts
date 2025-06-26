import { describe, it, expect } from 'vitest'
import { ValidationError } from 'yup'

import { mockProduct1 } from '../__mocks__/productsApi'
import { productSchema } from '../validations'

describe('productSchema validation', () => {
    it('should validate when all required fields are present and valid', async () => {
        const data = { ...mockProduct1, shade: undefined }
        await expect(productSchema.validate(data)).resolves.toEqual(data)
    })

    it('should validate when optional fields are included', async () => {
        const data = { ...mockProduct1 }
        await expect(productSchema.validate(data)).resolves.toEqual(data)
    })

    it('should validate when shade field is empty string (optional)', async () => {
        const data = { ...mockProduct1, shade: '' }
        await expect(productSchema.validate(data)).resolves.toMatchObject(data)
    })

    it('should reject when brandId is missing', async () => {
        const data = { ...mockProduct1, brandId: undefined }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.brand.errors.required'
        )
    })

    it('should reject when brandId is empty', async () => {
        const data = { ...mockProduct1, brandId: '' }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.brand.errors.required'
        )
    })

    it('should reject when name is missing', async () => {
        const data = { ...mockProduct1, name: undefined }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.name.errors.required'
        )
    })

    it('should reject when name is empty', async () => {
        const data = { ...mockProduct1, name: '' }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.name.errors.required'
        )
    })

    it('should reject when imageUrl is missing', async () => {
        const data = { ...mockProduct1, imageUrl: undefined }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.imageUrl.errors.required'
        )
    })

    it('should reject when imageUrl is not a valid URL', async () => {
        const data = { ...mockProduct1, imageUrl: 'not-a-url' }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.imageUrl.errors.url'
        )
    })

    it('should reject when comment is missing', async () => {
        const data = { ...mockProduct1, comment: undefined }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.comment.errors.required'
        )
    })

    it('should reject when comment is empty', async () => {
        const data = { ...mockProduct1, comment: '' }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.comment.errors.required'
        )
    })

    it('should reject when storeLinks is missing', async () => {
        const data = { ...mockProduct1, storeLinks: undefined }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.storeLinks.errors.required'
        )
    })

    it('should reject when storeLinks is an empty array', async () => {
        const data = { mockProduct: mockProduct1, storeLinks: [] }
        await expect(productSchema.validate(data)).rejects.toThrowError(
            'fields.storeLinks.errors.min'
        )
    })

    it('should collect multiple validation errors when abortEarly is false', async () => {
        const invalidProduct = {}

        try {
            await productSchema.validate(invalidProduct, { abortEarly: false })
            expect(true).toBe(false) // If validation doesn't throw, fail the test
        } catch (error) {
            const validationError = error as ValidationError
            expect(validationError.errors).toContain(
                'fields.brand.errors.required'
            )
            expect(validationError.errors).toContain(
                'fields.name.errors.required'
            )
            expect(validationError.errors).toContain(
                'fields.imageUrl.errors.required'
            )
            expect(validationError.errors).toContain(
                'fields.comment.errors.required'
            )
            expect(validationError.errors).toContain(
                'fields.storeLinks.errors.required'
            )
        }
    })
})
