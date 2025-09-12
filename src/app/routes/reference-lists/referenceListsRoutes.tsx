import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { Brands } from '@/pages/brands/Brands'
import { Categories } from '@/pages/categories/Categories'
import { ReferenceLists } from '@/pages/reference-lists/ReferenceLists'
import { Stores } from '@/pages/stores/Stores'

export const referenceListRoutes = [
    <Route
        key="reference-lists"
        path="/reference-lists"
        element={<AppLayout />}
    >
        <Route element={<RequireRole allowedRoles={['admin']} />}>
            <Route index element={<ReferenceLists />} />
            <Route path="brands" element={<Brands />} />
            <Route path="categories" element={<Categories />} />
            <Route path="stores" element={<Stores />} />
        </Route>
    </Route>,
]
