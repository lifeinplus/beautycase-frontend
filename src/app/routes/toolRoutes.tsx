import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { StoreLinksAddPageForTool } from '@/features/stores/wrappers/StoreLinksAddPageForTool'
import { ToolAddPage } from '@/pages/tool/ToolAddPage'
import { ToolDetailsPage } from '@/pages/tool/ToolDetailsPage'
import { ToolEditPage } from '@/pages/tool/ToolEditPage'
import { ToolsGalleryPage } from '@/pages/tool/ToolsGalleryPage'

export const toolRoutes = [
    <Route key="tools" path="/tools">
        <Route path=":id" element={<ToolDetailsPage />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<ToolsGalleryPage />} />
            <Route path=":id/links" element={<StoreLinksAddPageForTool />} />
            <Route path="add" element={<ToolAddPage />} />
            <Route path="edit/:id" element={<ToolEditPage />} />
        </Route>
    </Route>,
]
