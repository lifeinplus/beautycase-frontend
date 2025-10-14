import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { UsersList } from '@/pages/users/list/UsersList'

export const usersRoutes = [
    <Route key="users" path="/users" element={<AppLayout />}>
        <Route element={<RequireRole allowedRoles={['admin']} />}>
            <Route index element={<UsersList />} />
        </Route>
    </Route>,
]
