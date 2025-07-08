import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { StageAddPage } from '@/pages/stage/StageAddPage'
import { StageDetailsPage } from '@/pages/stage/StageDetailsPage'
import { StageEditPage } from '@/pages/stage/StageEditPage'
import { StageListPage } from '@/pages/stage/StageListPage'
import { ProductSelectionPage } from '@/pages/product/ProductSelectionPage'

export const stageRoutes = [
    <Route key="stages" path="/stages">
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<StageListPage />} />
            <Route path=":id" element={<StageDetailsPage />} />
            <Route path="add" element={<StageAddPage />} />
            <Route path="add/products" element={<ProductSelectionPage />} />
            <Route path="edit/:id" element={<StageEditPage />} />
            <Route
                path="edit/:id/products"
                element={<ProductSelectionPage />}
            />
        </Route>
    </Route>,
]
