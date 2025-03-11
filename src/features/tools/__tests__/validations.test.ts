import { describe, it, expect } from 'vitest'

import { mockTool } from '../../../mocks'
import { toolSchema } from '../validations'

describe('toolSchema validation', () => {
    it('should validate correct data', async () => {
        const data = { ...mockTool }
        await expect(toolSchema.validate(data)).resolves.toEqual(data)
    })

    it('should fail when brandId is missing', async () => {
        const data = { ...mockTool, brandId: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Выберите бренд'
        )
    })

    it('should fail when name is missing', async () => {
        const data = { ...mockTool, name: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Укажите название инструмента'
        )
    })

    it('should fail when imageUrl is missing', async () => {
        const data = { ...mockTool, imageUrl: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Укажите ссылку на изображение'
        )
    })

    it('should fail when imageUrl is not a valid URL', async () => {
        const data = { ...mockTool, imageUrl: 'invalid-url' }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Введите корректный URL'
        )
    })

    it('should allow optional number field', async () => {
        const data = { ...mockTool, number: undefined }
        await expect(toolSchema.validate(data)).resolves.toEqual({
            ...data,
            number: undefined,
        })
    })

    it('should fail when comment is missing', async () => {
        const data = { ...mockTool, comment: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Укажите комментарий'
        )
    })

    it('should fail when storeLinks is missing', async () => {
        const data = { ...mockTool, storeLinks: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Добавьте ссылки на инструмент'
        )
    })

    it('should fail when storeLinks is empty', async () => {
        const data = { ...mockTool, storeLinks: [] }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Добавьте ссылки на инструмент'
        )
    })
})
