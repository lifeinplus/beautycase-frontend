import { describe, it, expect } from 'vitest'
import reducer, {
    clearFormData,
    setFormData,
    selectFormData,
    selectIsDirty,
} from '../formSlice'

describe('formSlice', () => {
    const initialState = {
        data: {},
        isDirty: false,
    }

    describe('reducers', () => {
        describe('clearFormData', () => {
            it('should reset state to initial values', () => {
                const previousState = {
                    data: { name: 'John', email: 'john@example.com' },
                    isDirty: true,
                }

                const newState = reducer(previousState, clearFormData())
                expect(newState).toEqual(initialState)
            })
        })

        describe('setFormData', () => {
            it('should update data and set isDirty to true', () => {
                const previousState = { ...initialState }
                const payload = { name: 'John' }

                const newState = reducer(previousState, setFormData(payload))

                expect(newState.data).toEqual(payload)
                expect(newState.isDirty).toBe(true)
            })

            it('should merge new data with existing data', () => {
                const previousState = {
                    data: { name: 'John' },
                    isDirty: true,
                }

                const payload = { email: 'john@example.com' }

                const newState = reducer(previousState, setFormData(payload))

                expect(newState.data).toEqual({
                    name: 'John',
                    email: 'john@example.com',
                })

                expect(newState.isDirty).toBe(true)
            })

            it('should overwrite existing fields with new values', () => {
                const previousState = {
                    data: { name: 'John', email: 'john@example.com' },
                    isDirty: true,
                }

                const payload = { name: 'Jane' }

                const newState = reducer(previousState, setFormData(payload))

                expect(newState.data).toEqual({
                    name: 'Jane',
                    email: 'john@example.com',
                })

                expect(newState.isDirty).toBe(true)
            })
        })
    })

    describe('selectors', () => {
        const state = {
            form: {
                data: { email: 'john@example.com' },
                isDirty: true,
            },
        }

        describe('selectFormData', () => {
            it('should return the form data', () => {
                const formData = selectFormData(state)
                expect(formData).toEqual({ email: 'john@example.com' })
            })
        })

        describe('selectIsDirty', () => {
            it('should return the isDirty flag', () => {
                const isDirty = selectIsDirty(state)
                expect(isDirty).toBe(true)
            })

            it('should return false when form is not dirty', () => {
                state.form.isDirty = false
                const isDirty = selectIsDirty(state)
                expect(isDirty).toBe(false)
            })
        })
    })
})
