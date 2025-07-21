import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { MakeupBagAdd } from '@/pages/makeup-bags/add/MakeupBagAdd'
import { MakeupBagDetails } from '@/pages/makeup-bags/details/MakeupBagDetails'
import { MakeupBagEdit } from '@/pages/makeup-bags/edit/MakeupBagEdit'
import { MakeupBagList } from '@/pages/makeup-bags/list/MakeupBagList'
import { ToolSelectionPage } from '@/pages/tool/ToolSelectionPage'
import { Layout } from '@/shared/components/layout/Layout'
import { StageSelection } from '@/widgets/stage/stage-selection/StageSelection'

export const makeupBagRoutes = [
    <Route key="makeup-bags" path="/makeup-bags">
        <Route element={<Layout />}>
            <Route path=":id" element={<MakeupBagDetails />} />
            <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
                <Route index element={<MakeupBagList />} />
                <Route path="add" element={<MakeupBagAdd />} />
                <Route path="add/stages" element={<StageSelection />} />
                <Route path="add/tools" element={<ToolSelectionPage />} />
                <Route path="edit/:id" element={<MakeupBagEdit />} />
                <Route path="edit/:id/stages" element={<StageSelection />} />
                <Route path="edit/:id/tools" element={<ToolSelectionPage />} />
            </Route>
        </Route>
    </Route>,
]
