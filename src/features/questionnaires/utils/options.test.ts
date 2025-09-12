import { describe, expect, it } from 'vitest'
import { options } from './options'

describe('Questionnaire Options', () => {
    it('no option categories are empty', () => {
        Object.values(options).forEach((optionArray) => {
            expect(optionArray.length).toBeGreaterThan(0)
        })
    })
})
