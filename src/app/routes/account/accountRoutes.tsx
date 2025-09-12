import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { Account } from '@/pages/account/Account'

export const accountRoutes = [
    <Route key="account" path="/account" element={<AppLayout />}>
        <Route index element={<Account />} />
    </Route>,
]
