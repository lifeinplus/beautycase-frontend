import { describe, expect, it } from 'vitest'
import { ValidationError } from 'yup'

import {
    mockQuestionnaire1,
    mockQuestionnaireFull,
} from '../../api/__mocks__/questionnairesApi'
import { makeupBagQuestionnaireSchema } from './makeupBagQuestionnaireSchema'

describe('makeupBagQuestionnaireSchema', () => {
    it('should validate when required fields are present', async () => {
        const data = { ...mockQuestionnaire1 }
        await expect(
            makeupBagQuestionnaireSchema.validate(data)
        ).resolves.toMatchObject(data)
    })

    it('should validate a complete form submission', async () => {
        const data = { ...mockQuestionnaireFull }
        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result).toMatchObject({
            ...data,
            age: 28, // Age should be converted to number
        })
    })

    it('should transform empty strings to undefined', async () => {
        const data = { ...mockQuestionnaire1, age: '25', city: '' }
        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result.age).toBe(25)
        expect(result.city).toBeUndefined()
    })

    it('should transform null values to undefined', async () => {
        const data = { ...mockQuestionnaire1, instagram: null }
        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result.instagram).toBeUndefined()
    })

    it('should transform age string to number', async () => {
        const data = { ...mockQuestionnaire1, age: '30' }
        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result.age).toBe(30)
        expect(typeof result.age).toBe('number')
    })

    it('should transform objects with all false values to undefined', async () => {
        const data = {
            ...mockQuestionnaire1,
            desiredSkills: {
                bright: false,
                delicate: false,
                evening: false,
                office: false,
                filming: false,
            },
        }

        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result.desiredSkills).toBeUndefined()
    })

    it('should keep objects with at least one true value', async () => {
        const data = {
            ...mockQuestionnaire1,
            desiredSkills: {
                bright: true,
                delicate: false,
                evening: false,
                office: false,
                filming: false,
            },
        }

        const result = await makeupBagQuestionnaireSchema.validate(data)

        expect(result.desiredSkills).toEqual({
            bright: true,
            delicate: false,
            evening: false,
            office: false,
            filming: false,
        })
    })

    it('should handle undefined values properly', async () => {
        const data = {
            ...mockQuestionnaire1,
            age: undefined,
            desiredSkills: undefined,
        }

        const result = await makeupBagQuestionnaireSchema.validate(data)

        expect(result.age).toBeUndefined()
        expect(result.desiredSkills).toBeUndefined()
    })

    it('should reject when name is missing', async () => {
        const invalidData = {
            ...mockQuestionnaire1,
            name: undefined,
        }

        const result = makeupBagQuestionnaireSchema.validate(invalidData)
        await expect(result).rejects.toThrowError('fields.name.errors.required')
    })

    it('should reject when makeupBag is missing', async () => {
        const invalidData = {
            ...mockQuestionnaire1,
            makeupBag: undefined,
        }

        const result = makeupBagQuestionnaireSchema.validate(invalidData)
        await expect(result).rejects.toThrowError(
            'fields.makeupBag.errors.required'
        )
    })

    it('should reject when required fields are missing', async () => {
        const invalidData = {}

        try {
            await makeupBagQuestionnaireSchema.validate(invalidData, {
                abortEarly: false,
            })

            expect(true).toBe(false) // If validation doesn't throw, fail the test
        } catch (error) {
            const validationError = error as ValidationError
            expect(validationError.errors).toContain(
                'fields.makeupBag.errors.required'
            )
            expect(validationError.errors).toContain(
                'fields.name.errors.required'
            )
        }
    })

    it('should reject invalid age values', async () => {
        const data = { ...mockQuestionnaire1, age: 'not-a-number' }
        await expect(
            makeupBagQuestionnaireSchema.validate(data)
        ).rejects.toThrow()
    })
})
