import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import server from '../../../tests/mocks/server'
import { renderHookWithProvider } from '../../../tests/mocks/wrappers'
import {
    mockQuestionnaire,
    mockQuestionnaireCreated,
    mockQuestionnaires,
} from '../__mocks__/questionnairesApi'
import {
    useCreateQuestionnaireMutation,
    useReadQuestionnairesQuery,
    useReadQuestionnaireQuery,
} from '../questionnairesApi'

describe('questionnairesApi', () => {
    it('creates a new questionnaire', async () => {
        const { result } = renderHookWithProvider(() =>
            useCreateQuestionnaireMutation()
        )

        const [createQuestionnaire] = result.current

        await act(async () => {
            const response =
                await createQuestionnaire(mockQuestionnaire).unwrap()
            expect(response).toMatchObject(mockQuestionnaireCreated)
        })
    })

    it('reads all questionnaires', async () => {
        const { result } = renderHookWithProvider(() =>
            useReadQuestionnairesQuery()
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toHaveLength(2)
        expect(result.current.data).toEqual(mockQuestionnaires)
        expect(result.current.data?.[0]._id).toBe(mockQuestionnaire._id)
    })

    it('reads a questionnaire by id', async () => {
        const { result } = renderHookWithProvider(() =>
            useReadQuestionnaireQuery(mockQuestionnaire._id!)
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toEqual(mockQuestionnaire)
        expect(result.current.data?._id).toBe(mockQuestionnaire._id)
    })

    it('returns error on failed questionnaire creation', async () => {
        server.use(
            http.post('api/questionnaires', () => {
                return HttpResponse.json(
                    { message: 'Invalid Data' },
                    { status: 400 }
                )
            })
        )

        const { result } = renderHookWithProvider(() =>
            useCreateQuestionnaireMutation()
        )

        const [addQuestionnaire] = result.current

        await act(async () => {
            const response = addQuestionnaire({
                ...mockQuestionnaire,
                name: '',
            }).unwrap()

            await expect(response).rejects.toThrow()
        })
    })

    it('handles 404 error when questionnaire is not found', async () => {
        const { result } = renderHookWithProvider(() =>
            useReadQuestionnaireQuery('999')
        )

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => expect(result.current.isError).toBe(true))

        expect(result.current.error).toBeDefined()
        expect(result.current.error).toHaveProperty('status', 404)
    })
})
