import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectUsername } from '.'

export const RequireAuth = () => {
    const location = useLocation()
    const username = useAppSelector(selectUsername)

    return username ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}
