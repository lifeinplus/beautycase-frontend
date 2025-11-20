import { describe, expect, it } from 'vitest'

import { mockTool1 } from './api/__mocks__/toolsApi'
import { toolSchema } from './validations'

describe('toolSchema validation', () => {
    it('should validate correct data', async () => {
        const data = { ...mockTool1 }
        await expect(toolSchema.validate(data)).resolves.toEqual(data)
    })

    it('should fail when brandId is missing', async () => {
        const data = { ...mockTool1, brandId: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'fields.brand.errors.required'
        )
    })

    it('should fail when name is missing', async () => {
        const data = { ...mockTool1, name: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'fields.name.errors.required'
        )
    })

    it('should fail when imageIds is missing', async () => {
        const data = { ...mockTool1, imageIds: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'fields.imageIds.errors.required'
        )
    })

    it('should allow optional number field', async () => {
        const data = { ...mockTool1, number: undefined }
        await expect(toolSchema.validate(data)).resolves.toEqual({
            ...data,
            number: undefined,
        })
    })

    it('should fail when comment is missing', async () => {
        const data = { ...mockTool1, comment: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'fields.comment.errors.required'
        )
    })
})
