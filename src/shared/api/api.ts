import {
    type BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import config from '@/app/config'
import { logout, setCredentials } from '@/features/auth/authSlice'
import type { AuthState } from '@/features/auth/types'

const baseQuery = fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const { auth } = getState() as { auth: AuthState }
        if (auth.accessToken) {
            headers.set('authorization', `Bearer ${auth.accessToken}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions)

        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'Brand',
        'Category',
        'Lesson',
        'MakeupBag',
        'Product',
        'Questionnaire',
        'Stage',
        'Store',
        'Tool',
    ],
    endpoints: () => ({}),
})
