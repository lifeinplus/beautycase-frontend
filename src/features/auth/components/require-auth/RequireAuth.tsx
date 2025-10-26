import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { ROUTES } from '@/shared/config/routes'
import { selectUsername } from '../../slice/authSlice'

export const RequireAuth = () => {
    const location = useLocation()
    const username = useAppSelector(selectUsername)

    return username ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.login} state={{ from: location }} replace />
    )
}
