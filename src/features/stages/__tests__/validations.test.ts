import { describe, it, expect } from 'vitest'

import { mockStage1 } from '../__mocks__/stagesApi'
import { stageSchema } from '../validations'

describe('stageSchema validation', () => {
    it('should validate correct data', async () => {
        const data = { ...mockStage1 }
        await expect(stageSchema.validate(data)).resolves.toEqual(data)
    })

    it('should fail when title is missing', async () => {
        const data = { ...mockStage1, title: undefined }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'fields.title.errors.required'
        )
    })

    it('should fail when subtitle is missing', async () => {
        const data = { ...mockStage1, subtitle: undefined }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'fields.subtitle.errors.required'
        )
    })

    it('should fail when imageUrl is missing', async () => {
        const data = { ...mockStage1, imageUrl: undefined }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'fields.imageUrl.errors.required'
        )
    })

    it('should fail when productIds is missing', async () => {
        const data = { ...mockStage1, productIds: undefined }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'fields.products.errors.required'
        )
    })

    it('should fail when productIds is empty', async () => {
        const data = { ...mockStage1, productIds: [] }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'fields.products.errors.min'
        )
    })
})
