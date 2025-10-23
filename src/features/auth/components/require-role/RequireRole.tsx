import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { Role } from '@/shared/model/role'
import { selectRole } from '../../slice/authSlice'

export interface RequireRoleProps {
    allowedRoles: Role[]
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
