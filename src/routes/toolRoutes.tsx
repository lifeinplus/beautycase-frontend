import { Route } from 'react-router-dom'
import { RequireRole } from '../features/auth/components/RequireRole'
import { ToolDetailsPage } from '../features/tools/pages/ToolDetailsPage'
import { ToolsGalleryPage } from '../features/tools/pages/ToolsGalleryPage'
import { ToolAddPage } from '../features/tools/pages/ToolAddPage'
import { ToolEditPage } from '../features/tools/pages/ToolEditPage'

export const toolRoutes = [
    <Route key="tools" path="/tools">
        <Route path=":id" element={<ToolDetailsPage />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<ToolsGalleryPage />} />
            <Route path="add" element={<ToolAddPage />} />
            <Route path="edit/:id" element={<ToolEditPage />} />
        </Route>
    </Route>,
]
