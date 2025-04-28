import { describe, expect, it } from 'vitest'
import { questions } from '../utils'

describe('Questionnaire Utils', () => {
    it('all questions have a label', () => {
        Object.values(questions).forEach((question) => {
            expect(question).toHaveProperty('label')
        })
    })
})
