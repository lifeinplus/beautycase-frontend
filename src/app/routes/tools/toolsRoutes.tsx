import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { StoreLinksAddForTool } from '@/features/stores/wrappers/links-add/tool/StoreLinksAddForTool'
import { ToolAdd } from '@/pages/tools/add/ToolAdd'
import { ToolDetails } from '@/pages/tools/details/ToolDetails'
import { ToolEdit } from '@/pages/tools/edit/ToolEdit'
import { ToolsGallery } from '@/pages/tools/gallery/ToolsGallery'

export const toolRoutes = [
    <Route key="tools" path="/tools" element={<AppLayout />}>
        <Route path=":id" element={<ToolDetails />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<ToolsGallery />} />
            <Route path=":id/edit" element={<ToolEdit />} />
            <Route path=":id/links" element={<StoreLinksAddForTool />} />
            <Route path="add" element={<ToolAdd />} />
        </Route>
    </Route>,
]
