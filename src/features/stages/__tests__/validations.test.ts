import { describe, it, expect } from 'vitest'

import { mockStage } from '../__mocks__/stagesApi'
import { stageSchema } from '../validations'

describe('stageSchema validation', () => {
    it('should validate correct data', async () => {
        const data = { ...mockStage }
        await expect(stageSchema.validate(data)).resolves.toEqual(data)
    })

    it('should fail when title is missing', async () => {
        const data = { ...mockStage, title: undefined }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'Укажите заголовок этапа'
        )
    })

    it('should fail when subtitle is missing', async () => {
        const data = { ...mockStage, subtitle: undefined }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'Укажите подзаголовок этапа'
        )
    })

    it('should fail when imageUrl is missing', async () => {
        const data = { ...mockStage, imageUrl: undefined }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'Укажите ссылку на изображение'
        )
    })

    it('should fail when productIds is missing', async () => {
        const data = { ...mockStage, productIds: undefined }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'Выберите продукты'
        )
    })

    it('should fail when productIds is empty', async () => {
        const data = { ...mockStage, productIds: [] }
        await expect(stageSchema.validate(data)).rejects.toThrow(
            'Выберите продукты'
        )
    })
})
