import { describe, it, expect } from 'vitest'
import { ValidationError } from 'yup'

import { mockLesson } from '../__mocks__/lessonsApi'
import { lessonSchema } from '../validations'

describe('Lesson Schema Validation', () => {
    it('should validate correct lesson data', async () => {
        const data = { ...mockLesson }
        const result = await lessonSchema.validate(data)
        expect(result).toEqual(data)
    })

    it('should fail when title is missing', async () => {
        const data = { ...mockLesson, title: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'Укажите заголовок урока'
        )
    })

    it('should fail when shortDescription is missing', async () => {
        const data = { ...mockLesson, shortDescription: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'Укажите краткое описание'
        )
    })

    it('should fail when videoUrl is missing', async () => {
        const data = { ...mockLesson, videoUrl: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'Укажите ссылку на видео'
        )
    })

    it('should fail when fullDescription is missing', async () => {
        const data = { ...mockLesson, fullDescription: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'Укажите полное описание'
        )
    })

    it('should fail when productIds is missing', async () => {
        const data = { ...mockLesson, productIds: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'Выберите продукты'
        )
    })

    it('should fail when productIds array is empty', async () => {
        const data = { ...mockLesson, productIds: [] }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'Выберите продукты'
        )
    })

    it('should fail with multiple errors when multiple fields are invalid', async () => {
        const data = {}

        try {
            await lessonSchema.validate(data, { abortEarly: false })
        } catch (error) {
            const validationError = error as ValidationError

            expect(validationError.errors).toContain('Укажите заголовок урока')
            expect(validationError.errors).toContain('Выберите продукты')
            expect(validationError.errors.length).toBeGreaterThan(1)
        }
    })
})
