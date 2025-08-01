import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { Brands } from '@/pages/brands/Brands'
import { ReferenceLists } from '@/pages/reference-lists/ReferenceLists'
import { Stores } from '@/pages/stores/Stores'
import { Layout } from '@/shared/components/layout/Layout'

export const referenceListRoutes = [
    <Route key="reference-lists" path="/reference-lists">
        <Route element={<Layout />}>
            <Route element={<RequireRole allowedRoles={['admin']} />}>
                <Route index element={<ReferenceLists />} />
                <Route path="brands" element={<Brands />} />
                <Route path="stores" element={<Stores />} />
            </Route>
        </Route>
    </Route>,
]
