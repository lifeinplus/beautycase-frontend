import { useAppDispatch } from '@/app/hooks/hooks'
import { setCredentials } from '@/features/auth/slice/authSlice'
import type { AuthState } from '@/features/auth/types'
import axiosClient from '../../../../shared/api/axios/axiosClient.config'

export const useRefreshAuth = () => {
    const dispatch = useAppDispatch()

    return async () => {
        const response = await axiosClient.get('auth/refresh')
        const data: AuthState = response.data

        dispatch(setCredentials(data))

        return data.accessToken
    }
}
