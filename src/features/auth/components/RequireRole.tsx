import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { selectRole } from '../authSlice'

export interface RequireRoleProps {
    allowedRoles: string[]
}

export const RequireRole = ({ allowedRoles }: RequireRoleProps) => {
    const location = useLocation()
    const role = useAppSelector(selectRole)

    return role && allowedRoles.includes(role) ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
}
