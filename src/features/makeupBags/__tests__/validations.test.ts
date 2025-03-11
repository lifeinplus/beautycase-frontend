import { describe, it, expect } from 'vitest'
import { ValidationError } from 'yup'

import { makeupBagSchema } from '../validations'
import { mockMakeupBag } from '../../../mocks'

describe('makeupBagSchema validation', () => {
    it('should validate when all required fields are present and valid', async () => {
        const data = { ...mockMakeupBag }
        await expect(makeupBagSchema.validate(data)).resolves.toEqual(data)
    })

    it('should validate with minimum array lengths', async () => {
        const data = {
            ...mockMakeupBag,
            stageIds: ['stage-1'],
            toolIds: ['tool-1'],
        }

        await expect(makeupBagSchema.validate(data)).resolves.toEqual(data)
    })

    it('should reject when categoryId is missing', async () => {
        const data = { ...mockMakeupBag, categoryId: undefined }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'Выберите категорию'
        )
    })

    it('should reject when categoryId is empty', async () => {
        const data = { ...mockMakeupBag, categoryId: '' }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'Выберите категорию'
        )
    })

    it('should reject when clientId is missing', async () => {
        const data = { ...mockMakeupBag, clientId: undefined }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'Выберите клиента'
        )
    })

    it('should reject when clientId is empty', async () => {
        const data = { ...mockMakeupBag, clientId: '' }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'Выберите клиента'
        )
    })

    it('should reject when stageIds is missing', async () => {
        const data = { ...mockMakeupBag, stageIds: undefined }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'Выберите этапы'
        )
    })

    it('should reject when stageIds is an empty array', async () => {
        const data = { ...mockMakeupBag, stageIds: [] }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'Выберите этапы'
        )
    })

    it('should reject when toolIds is missing', async () => {
        const data = { ...mockMakeupBag, toolIds: undefined }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'Выберите инструменты'
        )
    })

    it('should reject when toolIds is an empty array', async () => {
        const data = { ...mockMakeupBag, toolIds: [] }
        await expect(makeupBagSchema.validate(data)).rejects.toThrowError(
            'Выберите инструменты'
        )
    })

    it('should collect multiple validation errors when abortEarly is false', async () => {
        const invalidMakeupBag = {}

        try {
            await makeupBagSchema.validate(invalidMakeupBag, {
                abortEarly: false,
            })
            expect(true).toBe(false) // If validation doesn't throw, fail the test
        } catch (error) {
            const validationError = error as ValidationError
            expect(validationError.errors).toContain('Выберите категорию')
            expect(validationError.errors).toContain('Выберите клиента')
            expect(validationError.errors).toContain('Выберите этапы')
            expect(validationError.errors).toContain('Выберите инструменты')
        }
    })
})
