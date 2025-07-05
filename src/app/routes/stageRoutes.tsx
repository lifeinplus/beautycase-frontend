import { Route } from 'react-router-dom'

import { RequireRole } from '../../features/auth/components/RequireRole'
import { StageListPage } from '../../features/stages/pages/StageListPage'
import { StageDetailsPage } from '../../features/stages/pages/StageDetailsPage'
import { StageAddPage } from '../../features/stages/pages/StageAddPage'
import { StageEditPage } from '../../features/stages/pages/StageEditPage'
import { ProductSelectionPage } from '../../features/products/pages/ProductSelectionPage'

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
