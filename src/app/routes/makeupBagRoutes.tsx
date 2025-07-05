import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { MakeupBagAddPage } from '@/features/makeupBags/pages/MakeupBagAddPage'
import { MakeupBagEditPage } from '@/features/makeupBags/pages/MakeupBagEditPage'
import { MakeupBagListPage } from '@/features/makeupBags/pages/MakeupBagListPage'
import { MakeupBagPage } from '@/features/makeupBags/pages/MakeupBagPage'
import { StageSelectionPage } from '@/features/stages/pages/StageSelectionPage'
import { ToolSelectionPage } from '@/features/tools/pages/ToolSelectionPage'

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
