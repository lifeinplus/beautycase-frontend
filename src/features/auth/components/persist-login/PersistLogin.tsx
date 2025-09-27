import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import config from '@/app/config/config'
import { useAppSelector } from '@/app/hooks/hooks'
import { useRefreshAuth } from '@/features/auth/hooks/refresh-auth/useRefreshAuth'
import { Spinner } from '@/shared/components/common/spinner/Spinner'
import { StartupProgress } from '@/shared/components/common/startup-progress/StartupProgress'
import { selectAccessToken } from '../../slice/authSlice'

export const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isColdStart, setIsColdStart] = useState(false)
    const effectRan = useRef(false)

    const accessToken = useAppSelector(selectAccessToken)
    const refreshAuth = useRefreshAuth()

    useEffect(() => {
        let isMounted = true

        if (effectRan.current || config.prod) {
            const verifyRefreshAuth = async () => {
                try {
                    await refreshAuth()
                } catch (error) {
                    console.error('Refresh auth failed', error)
                } finally {
                    if (isMounted) setIsLoading(false)
                }
            }

            !accessToken ? verifyRefreshAuth() : setIsLoading(false)
        }

        return () => {
            effectRan.current = true
            isMounted = false
        }
    }, [])

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsColdStart(true)
            }, 1000)
            return () => clearTimeout(timer)
        } else {
            setIsColdStart(false)
        }
    }, [isLoading])

    if (isLoading) {
        return isColdStart ? <StartupProgress /> : <Spinner />
    }

    return <Outlet />
}
