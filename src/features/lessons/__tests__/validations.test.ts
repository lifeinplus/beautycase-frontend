import { describe, expect, it } from 'vitest'
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
            'fields.title.errors.required'
        )
    })

    it('should fail when shortDescription is missing', async () => {
        const data = { ...mockLesson1, shortDescription: undefined }

        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'fields.shortDescription.errors.required'
        )
    })

    it('should fail when videoUrl is missing', async () => {
        const data = { ...mockLesson1, videoUrl: undefined }

        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'fields.videoUrl.errors.required'
        )
    })

    it('should fail when fullDescription is missing', async () => {
        const data = { ...mockLesson1, fullDescription: undefined }

        await expect(lessonSchema.validate(data)).rejects.toThrow(
            'fields.fullDescription.errors.required'
        )
    })

    it('should fail with multiple errors when multiple fields are invalid', async () => {
        const data = {}

        try {
            await lessonSchema.validate(data, { abortEarly: false })
        } catch (error) {
            const validationError = error as ValidationError

            expect(validationError.errors).toContain(
                'fields.title.errors.required'
            )

            expect(validationError.errors).toContain(
                'fields.shortDescription.errors.required'
            )

            expect(validationError.errors.length).toBeGreaterThan(1)
        }
    })
})
