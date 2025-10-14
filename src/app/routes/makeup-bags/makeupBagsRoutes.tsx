import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { MakeupBagAdd } from '@/pages/makeup-bags/add/MakeupBagAdd'
import { MakeupBagDetails } from '@/pages/makeup-bags/details/MakeupBagDetails'
import { MakeupBagEdit } from '@/pages/makeup-bags/edit/MakeupBagEdit'
import { MakeupBagList } from '@/pages/makeup-bags/list/MakeupBagList'
import { StageSelection } from '@/widgets/stage/selection/StageSelection'
import { ToolSelection } from '@/widgets/tool/selection/ToolSelection'

export const makeupBagRoutes = [
    <Route key="makeup-bags" path="/makeup-bags" element={<AppLayout />}>
        <Route path=":id" element={<MakeupBagDetails />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<MakeupBagList />} />
            <Route path=":id/edit" element={<MakeupBagEdit />} />
            <Route path=":id/edit/stages" element={<StageSelection />} />
            <Route path=":id/edit/tools" element={<ToolSelection />} />
            <Route path="add" element={<MakeupBagAdd />} />
            <Route path="add/stages" element={<StageSelection />} />
            <Route path="add/tools" element={<ToolSelection />} />
        </Route>
    </Route>,
]
