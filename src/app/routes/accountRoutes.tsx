import { Route } from 'react-router-dom'

import { AccountPage } from '@/pages/account/AccountPage'

export const accountRoutes = [
    <Route key="account" path="/account" element={<AccountPage />} />,
]
