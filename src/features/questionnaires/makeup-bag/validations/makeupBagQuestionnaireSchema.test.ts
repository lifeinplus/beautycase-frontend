import { describe, expect, it } from 'vitest'
import { ValidationError } from 'yup'

import {
    mockMakeupBagQuestionnaire1,
    mockMakeupBagQuestionnaireFull,
} from '../../api/__mocks__/questionnairesApi'
import { makeupBagQuestionnaireSchema } from './makeupBagQuestionnaireSchema'

describe('makeupBagQuestionnaireSchema', () => {
    it('should validate when required fields are present', async () => {
        const data = { ...mockMakeupBagQuestionnaire1 }
        await expect(
            makeupBagQuestionnaireSchema.validate(data)
        ).resolves.toMatchObject(data)
    })

    it('should validate a complete form submission', async () => {
        const data = { ...mockMakeupBagQuestionnaireFull }
        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result).toMatchObject({
            ...data,
            age: 28, // Age should be converted to number
        })
    })

    it('should transform empty strings to undefined', async () => {
        const data = { ...mockMakeupBagQuestionnaire1, age: '25', city: '' }
        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result.age).toBe(25)
        expect(result.city).toBeUndefined()
    })

    it('should transform null values to undefined', async () => {
        const data = { ...mockMakeupBagQuestionnaire1, instagram: null }
        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result.instagram).toBeUndefined()
    })

    it('should transform age string to number', async () => {
        const data = { ...mockMakeupBagQuestionnaire1, age: '30' }
        const result = await makeupBagQuestionnaireSchema.validate(data)
        expect(result.age).toBe(30)
        expect(typeof result.age).toBe('number')
    })

    it('should transform objects with all false values to undefined', async () => {
        const data = {
            ...mockMakeupBagQuestionnaire1,
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
            ...mockMakeupBagQuestionnaire1,
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
            ...mockMakeupBagQuestionnaire1,
            age: undefined,
            desiredSkills: undefined,
        }

        const result = await makeupBagQuestionnaireSchema.validate(data)

        expect(result.age).toBeUndefined()
        expect(result.desiredSkills).toBeUndefined()
    })

    it('should reject when name is missing', async () => {
        const invalidData = {
            ...mockMakeupBagQuestionnaire1,
            name: undefined,
        }

        const result = makeupBagQuestionnaireSchema.validate(invalidData)
        await expect(result).rejects.toThrowError('fields.name.errors.required')
    })

    it('should reject when makeupBag is missing', async () => {
        const invalidData = {
            ...mockMakeupBagQuestionnaire1,
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
                'makeupBag.fields.makeupBag.errors.required'
            )
            expect(validationError.errors).toContain(
                'makeupBag.fields.name.errors.required'
            )
        }
    })

    it('should reject invalid age values', async () => {
        const data = { ...mockMakeupBagQuestionnaire1, age: 'not-a-number' }
        await expect(
            makeupBagQuestionnaireSchema.validate(data)
        ).rejects.toThrow()
    })
})
