import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { StageAddPage } from '@/features/stages/pages/StageAddPage'
import { StageDetailsPage } from '@/features/stages/pages/StageDetailsPage'
import { StageEditPage } from '@/features/stages/pages/StageEditPage'
import { StageListPage } from '@/features/stages/pages/StageListPage'
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
