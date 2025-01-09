import {
    type BaseQueryFn,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import config from '../../config'
import { type AuthState, logout, setCredentials } from '../auth/authSlice'

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

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Lesson', 'MakeupBag', 'Product', 'Stage', 'Tool'],
    endpoints: () => ({}),
})
