import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { Spinner } from '@/shared/components/common/Spinner'
import config from '@/app/config'
import { useRefreshAuth } from '@/shared/hooks/useRefreshAuth'
import { selectAccessToken } from '../authSlice'

export const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const effectRan = useRef(false)

    const accessToken = useAppSelector(selectAccessToken)
    const refreshAuth = useRefreshAuth()

    useEffect(() => {
        let isMounted = true

        if (effectRan.current || config.prod) {
            const verifyRefreshAuth = async () => {
                await refreshAuth()
                    .catch((error) => console.error(error))
                    .finally(() => isMounted && setIsLoading(false))
            }

            !accessToken ? verifyRefreshAuth() : setIsLoading(false)
        }

        return () => {
            effectRan.current = true
            isMounted = false
        }
    }, [])

    return isLoading ? <Spinner /> : <Outlet />
}
