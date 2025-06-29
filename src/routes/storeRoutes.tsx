import { Route } from 'react-router-dom'

import { RequireRole } from '../features/auth/components/RequireRole'
import { StoreLinkAddPage } from '../features/stores/pages/StoreLinkAddPage'

export const storeRoutes = [
    <Route key="stores" path="/stores">
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route path="links/add" element={<StoreLinkAddPage />} />
        </Route>
    </Route>,
]
