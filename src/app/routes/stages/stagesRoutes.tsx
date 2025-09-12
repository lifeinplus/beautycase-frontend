import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { ProductSelectionForStage } from '@/features/products/wrappers/selection/stage/ProductSelectionForStage'
import { StageAdd } from '@/pages/stages/add/StageAdd'
import { StageDetails } from '@/pages/stages/details/StageDetails'
import { StageEdit } from '@/pages/stages/edit/StageEdit'
import { StageList } from '@/pages/stages/list/StageList'

export const stageRoutes = [
    <Route key="stages" path="/stages" element={<AppLayout />}>
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<StageList />} />
            <Route path=":id" element={<StageDetails />} />
            <Route path=":id/edit" element={<StageEdit />} />
            <Route path=":id/products" element={<ProductSelectionForStage />} />
            <Route path="add" element={<StageAdd />} />
        </Route>
    </Route>,
]
