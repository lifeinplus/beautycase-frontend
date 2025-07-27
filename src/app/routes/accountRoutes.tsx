import { Route } from 'react-router-dom'

import { Account } from '@/pages/account/Account'
import { Layout } from '@/shared/components/layout/Layout'

export const accountRoutes = [
    <Route key="account" path="/account" element={<Layout />}>
        <Route index element={<Account />} />
    </Route>,
]
