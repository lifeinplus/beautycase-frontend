import { act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderHookWithProvider } from '@/tests/mocks/wrappers'
import {
    mockLoginParams,
    mockLoginResult,
    mockRegisterParams,
} from './__mocks__/authApi'
import {
    useLoginUserMutation,
    useLogoutUserMutation,
    useRegisterUserMutation,
} from './authApi'

describe('authApi', () => {
    describe('loginUser', () => {
        it('should login user successfully', async () => {
            const { result } = renderHookWithProvider(() =>
                useLoginUserMutation()
            )

            const [loginUser] = result.current

            await act(async () => {
                const response = await loginUser(mockLoginParams).unwrap()
                expect(response).toMatchObject(mockLoginResult)
            })
        })

        it('should throw an error for invalid credentials', async () => {
            const { result } = renderHookWithProvider(() =>
                useLoginUserMutation()
            )

            const [loginUser] = result.current

            await act(async () => {
                await expect(
                    loginUser({
                        ...mockLoginParams,
                        password: 'wrongpassword',
                    }).unwrap()
                ).rejects.toThrow()
            })
        })
    })

    describe('registerUser', () => {
        it('should register user when passwords match', async () => {
            const { result } = renderHookWithProvider(() =>
                useRegisterUserMutation()
            )

            const [registerUser] = result.current

            await act(async () => {
                await registerUser(mockRegisterParams)
            })
        })

        it('should throw an error when passwords do not match', async () => {
            const { result } = renderHookWithProvider(() =>
                useRegisterUserMutation()
            )

            const [register] = result.current

            await act(async () => {
                await expect(
                    register({
                        ...mockRegisterParams,
                        confirmPassword: 'differentpassword',
                    }).unwrap()
                ).rejects.toMatchObject({
                    status: 400,
                })
            })
        })
    })

    describe('logoutUser', () => {
        it('should logout user', async () => {
            const { result } = renderHookWithProvider(() =>
                useLogoutUserMutation()
            )

            const [logoutUser] = result.current

            await act(async () => {
                const response = await logoutUser().unwrap()
                expect(response).toBeNull()
            })
        })
    })
})
