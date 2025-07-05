import { Route } from 'react-router-dom'

import { AccountPage } from '@/features/account/pages/AccountPage'

export const accountRoutes = [
    <Route key="account" path="/account" element={<AccountPage />} />,
]
