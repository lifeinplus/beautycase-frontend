import { useAppDispatch } from '../app/hooks'
import axiosClient from '../features/api/axiosClient.config'
import { setCredentials } from '../features/auth/authSlice'
import type { AuthState } from '../features/auth/types'

export const useRefreshAuth = () => {
    const dispatch = useAppDispatch()

    return async () => {
        const response: AuthState = await axiosClient
            .get('auth/refresh')
            .then((response) => response.data)

        dispatch(setCredentials(response))

        return response.accessToken
    }
}
