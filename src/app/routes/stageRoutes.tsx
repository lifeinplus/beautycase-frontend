import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { ProductSelectionForStage } from '@/features/products/wrappers/ProductSelectionForStage'
import { StageAdd } from '@/pages/stages/add/StageAdd'
import { StageDetails } from '@/pages/stages/details/StageDetails'
import { StageEdit } from '@/pages/stages/edit/StageEdit'
import { StageList } from '@/pages/stages/list/StageList'
import { Layout } from '@/shared/components/layout/Layout'

export const stageRoutes = [
    <Route key="stages" path="/stages">
        <Route element={<Layout />}>
            <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
                <Route index element={<StageList />} />
                <Route path=":id" element={<StageDetails />} />
                <Route
                    path=":id/products"
                    element={<ProductSelectionForStage />}
                />
                <Route path="add" element={<StageAdd />} />
                <Route path="edit/:id" element={<StageEdit />} />
            </Route>
        </Route>
    </Route>,
]
