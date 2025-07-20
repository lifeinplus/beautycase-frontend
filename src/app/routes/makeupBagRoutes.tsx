import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { MakeupBagAdd } from '@/pages/makeup-bag/add/MakeupBagAdd'
import { MakeupBagDetails } from '@/pages/makeup-bag/details/MakeupBagDetails'
import { MakeupBagEdit } from '@/pages/makeup-bag/edit/MakeupBagEdit'
import { MakeupBagList } from '@/pages/makeup-bag/list/MakeupBagList'
import { StageSelectionPage } from '@/pages/stage/StageSelectionPage'
import { ToolSelectionPage } from '@/pages/tool/ToolSelectionPage'
import { Layout } from '@/shared/components/layout/Layout'

export const makeupBagRoutes = [
    <Route key="makeup-bag" path="/makeup-bag">
        <Route element={<Layout />}>
            <Route path=":id" element={<MakeupBagDetails />} />
            <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
                <Route path="add" element={<MakeupBagAdd />} />
                <Route path="add/stages" element={<StageSelectionPage />} />
                <Route path="add/tools" element={<ToolSelectionPage />} />
                <Route path="edit/:id" element={<MakeupBagEdit />} />
                <Route
                    path="edit/:id/stages"
                    element={<StageSelectionPage />}
                />
                <Route path="edit/:id/tools" element={<ToolSelectionPage />} />
                <Route path="list" element={<MakeupBagList />} />
            </Route>
        </Route>
    </Route>,
]
