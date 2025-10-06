import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'

import server from '@/tests/mocks/server'
import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import {
    useCreateMakeupBagQuestionnaireMutation,
    useCreateTrainingQuestionnaireMutation,
    useGetAllMakeupBagQuestionnairesQuery,
    useGetAllTrainingQuestionnairesQuery,
    useGetMakeupBagQuestionnaireByIdQuery,
    useGetTrainingQuestionnaireByIdQuery,
} from '../api/questionnairesApi'
import {
    mockMakeupBagQuestionnaire1,
    mockMakeupBagQuestionnaireCreated,
    mockMakeupBagQuestionnaires,
    mockTrainingQuestionnaire1,
    mockTrainingQuestionnaireCreated,
    mockTrainingQuestionnaires,
} from './__mocks__/questionnairesApi'

describe('questionnairesApi', () => {
    describe('MakeupBag', () => {
        describe('createMakeupBagQuestionnaire', () => {
            it('creates a new questionnaire', async () => {
                const { result } = renderHookWithProvider(() =>
                    useCreateMakeupBagQuestionnaireMutation()
                )

                const [createMakeupBagQuestionnaire] = result.current

                await act(async () => {
                    const response = await createMakeupBagQuestionnaire(
                        mockMakeupBagQuestionnaire1
                    ).unwrap()
                    expect(response).toMatchObject(
                        mockMakeupBagQuestionnaireCreated
                    )
                })
            })

            it('returns error on failed questionnaire creation', async () => {
                server.use(
                    http.post('api/questionnaires/makeup-bags', () => {
                        return HttpResponse.json(
                            { success: false },
                            { status: 400 }
                        )
                    })
                )

                const { result } = renderHookWithProvider(() =>
                    useCreateMakeupBagQuestionnaireMutation()
                )

                const [createMakeupBagQuestionnaire] = result.current

                await act(async () => {
                    const response = createMakeupBagQuestionnaire({
                        ...mockMakeupBagQuestionnaire1,
                        name: '',
                    }).unwrap()

                    await expect(response).rejects.toThrow()
                })
            })
        })

        describe('getAllMakeupBagQuestionnaires', () => {
            it('gets all questionnaires', async () => {
                const { result } = renderHookWithProvider(() =>
                    useGetAllMakeupBagQuestionnairesQuery()
                )

                expect(result.current.isLoading).toBe(true)

                await waitFor(() => expect(result.current.isSuccess).toBe(true))

                expect(result.current.data).toHaveLength(2)
                expect(result.current.data).toEqual(mockMakeupBagQuestionnaires)
                expect(result.current.data?.[0]._id).toBe(
                    mockMakeupBagQuestionnaire1._id
                )
            })
        })

        describe('getMakeupBagQuestionnaireById', () => {
            it('gets a questionnaire by id', async () => {
                const { result } = renderHookWithProvider(() =>
                    useGetMakeupBagQuestionnaireByIdQuery(
                        mockMakeupBagQuestionnaire1._id!
                    )
                )

                expect(result.current.isLoading).toBe(true)

                await waitFor(() => expect(result.current.isSuccess).toBe(true))

                expect(result.current.data).toEqual(mockMakeupBagQuestionnaire1)
                expect(result.current.data?._id).toBe(
                    mockMakeupBagQuestionnaire1._id
                )
            })

            it('handles 404 error when questionnaire is not found', async () => {
                const { result } = renderHookWithProvider(() =>
                    useGetMakeupBagQuestionnaireByIdQuery('999')
                )

                expect(result.current.isLoading).toBe(true)

                await waitFor(() => expect(result.current.isError).toBe(true))

                expect(result.current.error).toBeDefined()
                expect(result.current.error).toHaveProperty('status', 404)
            })
        })
    })

    describe('Training', () => {
        describe('createTrainingQuestionnaire', () => {
            it('creates a new questionnaire', async () => {
                const { result } = renderHookWithProvider(() =>
                    useCreateTrainingQuestionnaireMutation()
                )

                const [createTrainingQuestionnaire] = result.current

                await act(async () => {
                    const response = await createTrainingQuestionnaire(
                        mockTrainingQuestionnaire1
                    ).unwrap()
                    expect(response).toMatchObject(
                        mockTrainingQuestionnaireCreated
                    )
                })
            })

            it('returns error on failed questionnaire creation', async () => {
                server.use(
                    http.post('api/questionnaires/trainings', () => {
                        return HttpResponse.json(
                            { success: false },
                            { status: 400 }
                        )
                    })
                )

                const { result } = renderHookWithProvider(() =>
                    useCreateTrainingQuestionnaireMutation()
                )

                const [createTrainingQuestionnaire] = result.current

                await act(async () => {
                    const response = createTrainingQuestionnaire({
                        ...mockTrainingQuestionnaire1,
                        name: '',
                    }).unwrap()

                    await expect(response).rejects.toThrow()
                })
            })
        })

        describe('getAllTrainingQuestionnaires', () => {
            it('gets all questionnaires', async () => {
                const { result } = renderHookWithProvider(() =>
                    useGetAllTrainingQuestionnairesQuery()
                )

                expect(result.current.isLoading).toBe(true)

                await waitFor(() => expect(result.current.isSuccess).toBe(true))

                expect(result.current.data).toHaveLength(2)
                expect(result.current.data).toEqual(mockTrainingQuestionnaires)
                expect(result.current.data?.[0]._id).toBe(
                    mockTrainingQuestionnaire1._id
                )
            })
        })

        describe('getTrainingQuestionnaireById', () => {
            it('gets a questionnaire by id', async () => {
                const { result } = renderHookWithProvider(() =>
                    useGetTrainingQuestionnaireByIdQuery(
                        mockTrainingQuestionnaire1._id!
                    )
                )

                expect(result.current.isLoading).toBe(true)

                await waitFor(() => expect(result.current.isSuccess).toBe(true))

                expect(result.current.data).toEqual(mockTrainingQuestionnaire1)
                expect(result.current.data?._id).toBe(
                    mockTrainingQuestionnaire1._id
                )
            })

            it('handles 404 error when questionnaire is not found', async () => {
                const { result } = renderHookWithProvider(() =>
                    useGetTrainingQuestionnaireByIdQuery('999')
                )

                expect(result.current.isLoading).toBe(true)

                await waitFor(() => expect(result.current.isError).toBe(true))

                expect(result.current.error).toBeDefined()
                expect(result.current.error).toHaveProperty('status', 404)
            })
        })
    })
})
