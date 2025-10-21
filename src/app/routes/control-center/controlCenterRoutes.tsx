import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { Brands } from '@/pages/brands/Brands'
import { Categories } from '@/pages/categories/Categories'
import { ControlCenterGallery } from '@/pages/control-center/gallery/ControlCenterGallery'
import { ReferenceLists } from '@/pages/control-center/reference-lists/ReferenceLists'
import { UserDetails } from '@/pages/control-center/users/details/UserDetails'
import { UsersList } from '@/pages/control-center/users/list/UsersList'
import { Stores } from '@/pages/stores/Stores'

export const controlCenterRoutes = [
    <Route key="control-center" path="/control-center" element={<AppLayout />}>
        <Route element={<RequireRole allowedRoles={['admin']} />}>
            <Route index element={<ControlCenterGallery />} />
            <Route path="reference-lists">
                <Route index element={<ReferenceLists />} />
                <Route path="brands" element={<Brands />} />
                <Route path="categories" element={<Categories />} />
                <Route path="stores" element={<Stores />} />
            </Route>
            <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<UserDetails />} />
            </Route>
        </Route>
    </Route>,
]
