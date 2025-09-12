import { describe, expect, it } from 'vitest'
import { ValidationError } from 'yup'

import { mockMakeupBag1 } from './api/__mocks__/makeupBagsApi'
import { makeupBagSchema } from './validations'

describe('makeupBagSchema validation', () => {
    it('should validate when all required fields are present and valid', async () => {
        const data = { ...mockMakeupBag1 }
        await expect(makeupBagSchema.validate(data)).resolves.toEqual(data)
    })

    it('should validate with minimum array lengths', async () => {
        const data = {
            ...mockMakeupBag1,
            stageIds: ['stage-1'],
            toolIds: ['tool-1'],
        }

        await expect(makeupBagSchema.validate(data)).resolves.toEqual(data)
    })

    it('should reject when categoryId is missing', async () => {
        const data = { ...mockMakeupBag1, categoryId: undefined }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'fields.category.errors.required'
        )
    })

    it('should reject when categoryId is empty', async () => {
        const data = { ...mockMakeupBag1, categoryId: '' }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'fields.category.errors.required'
        )
    })

    it('should reject when clientId is missing', async () => {
        const data = { ...mockMakeupBag1, clientId: undefined }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'fields.client.errors.required'
        )
    })

    it('should reject when clientId is empty', async () => {
        const data = { ...mockMakeupBag1, clientId: '' }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'fields.client.errors.required'
        )
    })

    it('should reject when stageIds is missing', async () => {
        const data = { ...mockMakeupBag1, stageIds: undefined }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'fields.stages.errors.required'
        )
    })

    it('should reject when stageIds is an empty array', async () => {
        const data = { ...mockMakeupBag1, stageIds: [] }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'fields.stages.errors.min'
        )
    })

    it('should reject when toolIds is missing', async () => {
        const data = { ...mockMakeupBag1, toolIds: undefined }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'fields.tools.errors.required'
        )
    })

    it('should reject when toolIds is an empty array', async () => {
        const data = { ...mockMakeupBag1, toolIds: [] }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'fields.tools.errors.min'
        )
    })

    it('should collect multiple validation errors when abortEarly is false', async () => {
        const invalidMakeupBag = {}

        const errors = [
            'fields.category.errors.required',
            'fields.client.errors.required',
            'fields.stages.errors.required',
            'fields.tools.errors.required',
        ]

        try {
            await makeupBagSchema.validate(invalidMakeupBag, {
                abortEarly: false,
            })
            expect(true).toBe(false) // If validation doesn't throw, fail the test
        } catch (error) {
            const validationError = error as ValidationError

            errors.forEach((e) => {
                expect(validationError.errors).toContain(e)
            })
        }
    })
})
