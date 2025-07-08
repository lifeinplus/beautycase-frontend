import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { StageSelectionPage } from '@/pages/stage/StageSelectionPage'
import { ToolSelectionPage } from '@/pages/tool/ToolSelectionPage'
import { MakeupBagAddPage } from '@/pages/makeup-bag/MakeupBagAddPage'
import { MakeupBagEditPage } from '@/pages/makeup-bag/MakeupBagEditPage'
import { MakeupBagListPage } from '@/pages/makeup-bag/MakeupBagListPage'
import { MakeupBagPage } from '@/pages/makeup-bag/MakeupBagPage'

export const makeupBagRoutes = [
    <Route key="makeup-bags" path="/makeup_bags">
        <Route path=":id" element={<MakeupBagPage />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<MakeupBagListPage />} />
            <Route path="add" element={<MakeupBagAddPage />} />
            <Route path="add/stages" element={<StageSelectionPage />} />
            <Route path="add/tools" element={<ToolSelectionPage />} />
            <Route path="edit/:id" element={<MakeupBagEditPage />} />
            <Route path="edit/:id/stages" element={<StageSelectionPage />} />
            <Route path="edit/:id/tools" element={<ToolSelectionPage />} />
        </Route>
    </Route>,
]
