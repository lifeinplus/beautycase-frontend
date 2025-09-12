import { describe, expect, it } from 'vitest'
import { questions } from './questions'

describe('questions', () => {
    it('all questions have a label', () => {
        Object.values(questions).forEach((question) => {
            expect(question).toHaveProperty('label')
        })
    })
})
