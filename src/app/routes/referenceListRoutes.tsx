import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { Brands } from '@/pages/brands/Brands'
import { ReferenceListsPage } from '@/pages/reference-list/ReferenceListsPage'
import { StoresPage } from '@/pages/store/StoresPage'
import { Layout } from '@/shared/components/layout/Layout'

export const referenceListRoutes = [
    <Route key="reference-lists" path="/reference-lists">
        <Route element={<Layout />}>
            <Route element={<RequireRole allowedRoles={['admin']} />}>
                <Route index element={<ReferenceListsPage />} />
                <Route path="brands" element={<Brands />} />
                <Route path="stores" element={<StoresPage />} />
            </Route>
        </Route>
    </Route>,
]
