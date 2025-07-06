import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { ReferenceListsPage } from '@/pages/reference-list/ReferenceListsPage'
import { BrandsPage } from '@/pages/brand/BrandsPage'
import { StoresPage } from '@/pages/store/StoresPage'

export const referenceListRoutes = [
    <Route key="reference-lists" path="/reference_lists">
        <Route element={<RequireRole allowedRoles={['admin']} />}>
            <Route index element={<ReferenceListsPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="stores" element={<StoresPage />} />
        </Route>
    </Route>,
]
