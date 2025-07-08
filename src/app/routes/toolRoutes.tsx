import { Route } from 'react-router-dom'
import { RequireRole } from '@/features/auth/components/RequireRole'
import { StoreLinkAddPage } from '@/pages/store/StoreLinkAddPage'
import { ToolDetailsPage } from '@/pages/tool/ToolDetailsPage'
import { ToolsGalleryPage } from '@/pages/tool/ToolsGalleryPage'
import { ToolAddPage } from '@/pages/tool/ToolAddPage'
import { ToolEditPage } from '@/pages/tool/ToolEditPage'

export const toolRoutes = [
    <Route key="tools" path="/tools">
        <Route path=":id" element={<ToolDetailsPage />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<ToolsGalleryPage />} />
            <Route path="add" element={<ToolAddPage />} />
            <Route path="add/links" element={<StoreLinkAddPage />} />
            <Route path="edit/:id" element={<ToolEditPage />} />
            <Route path="edit/:id/links" element={<StoreLinkAddPage />} />
        </Route>
    </Route>,
]
