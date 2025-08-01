import { Route } from 'react-router-dom'

import { Account } from '@/pages/account/Account'
import { Layout } from '@/shared/components/layout/Layout'

export const accountRoutes = [
    <Route key={'account-layout'} element={<Layout />}>
        <Route key="account" path="/account" element={<Account />} />
    </Route>,
]
