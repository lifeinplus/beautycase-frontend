import { describe, it, expect } from 'vitest'
import { ValidationError } from 'yup'

import { mockLesson1 } from '../__mocks__/lessonsApi'
import { lessonSchema } from '../validations'

describe('Lesson Schema Validation', () => {
    it('should validate correct lesson data', async () => {
        const data = { ...mockLesson1 }
        const result = await lessonSchema.validate(data)
        expect(result).toEqual(data)
    })

    it('should fail when title is missing', async () => {
        const data = { ...mockLesson1, title: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'validations.title'
        )
    })

    it('should fail when shortDescription is missing', async () => {
        const data = { ...mockLesson1, shortDescription: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'validations.shortDescription'
        )
    })

    it('should fail when videoUrl is missing', async () => {
        const data = { ...mockLesson1, videoUrl: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'validations.videoUrl'
        )
    })

    it('should fail when fullDescription is missing', async () => {
        const data = { ...mockLesson1, fullDescription: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'validations.fullDescription'
        )
    })

    it('should fail when productIds is missing', async () => {
        const data = { ...mockLesson1, productIds: undefined }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'validations.products.required'
        )
    })

    it('should fail when productIds array is empty', async () => {
        const data = { ...mockLesson1, productIds: [] }
        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'validations.products.min'
        )
    })

    it('should fail with multiple errors when multiple fields are invalid', async () => {
        const data = {}

        try {
            await lessonSchema.validate(data, { abortEarly: false })
        } catch (error) {
            const validationError = error as ValidationError

            expect(validationError.errors).toContain('validations.title')
            expect(validationError.errors).toContain(
                'validations.products.required'
            )
            expect(validationError.errors.length).toBeGreaterThan(1)
        }
    })
})
