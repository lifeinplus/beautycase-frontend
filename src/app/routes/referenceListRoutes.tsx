import { Route } from 'react-router-dom'

import { RequireRole } from '../../features/auth/components/RequireRole'
import { ReferenceListsPage } from '../../features/referenceLists/pages/ReferenceListsPage'
import { BrandsPage } from '../../features/brands/pages/BrandsPage'
import { StoresPage } from '../../features/stores/pages/StoresPage'

export const referenceListRoutes = [
    <Route key="reference-lists" path="/reference_lists">
        <Route element={<RequireRole allowedRoles={['admin']} />}>
            <Route index element={<ReferenceListsPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="stores" element={<StoresPage />} />
        </Route>
    </Route>,
]
