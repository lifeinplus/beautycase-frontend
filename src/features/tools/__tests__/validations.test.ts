import { describe, it, expect } from 'vitest'

import { mockTool1 } from '../__mocks__/toolsApi'
import { toolSchema } from '../validations'

describe('toolSchema validation', () => {
    it('should validate correct data', async () => {
        const data = { ...mockTool1 }
        await expect(toolSchema.validate(data)).resolves.toEqual(data)
    })

    it('should fail when brandId is missing', async () => {
        const data = { ...mockTool1, brandId: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Выберите бренд'
        )
    })

    it('should fail when name is missing', async () => {
        const data = { ...mockTool1, name: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Укажите название инструмента'
        )
    })

    it('should fail when imageUrl is missing', async () => {
        const data = { ...mockTool1, imageUrl: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Укажите ссылку на изображение'
        )
    })

    it('should fail when imageUrl is not a valid URL', async () => {
        const data = { ...mockTool1, imageUrl: 'invalid-url' }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Введите корректный URL'
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
            'Укажите комментарий'
        )
    })

    it('should fail when storeLinks is missing', async () => {
        const data = { ...mockTool1, storeLinks: undefined }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Добавьте ссылки на инструмент'
        )
    })

    it('should fail when storeLinks is empty', async () => {
        const data = { ...mockTool1, storeLinks: [] }
        await expect(toolSchema.validate(data)).rejects.toThrow(
            'Добавьте ссылки на инструмент'
        )
    })
})
