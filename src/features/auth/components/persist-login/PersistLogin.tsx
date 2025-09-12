import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import config from '@/app/config/config'
import { useAppSelector } from '@/app/hooks/hooks'
import { useRefreshAuth } from '@/features/auth/hooks/refresh-auth/useRefreshAuth'
import { Spinner } from '@/shared/components/common/spinner/Spinner'
import { selectAccessToken } from '../../slice/authSlice'

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
