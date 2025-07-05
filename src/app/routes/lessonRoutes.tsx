import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { LessonDetailsPage } from '@/features/lessons/pages/LessonDetailsPage'
import { LessonsGalleryPage } from '@/features/lessons/pages/LessonsGalleryPage'
import { LessonAddPage } from '@/features/lessons/pages/LessonAddPage'
import { LessonEditPage } from '@/features/lessons/pages/LessonEditPage'
import { UserSelectionPage } from '@/features/users/pages/UserSelectionPage'
import { ProductSelectionPage } from '@/features/products/pages/ProductSelectionPage'

export const lessonRoutes = [
    <Route key="lessons" path="/lessons">
        <Route path=":id" element={<LessonDetailsPage />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<LessonsGalleryPage />} />
            <Route path="add" element={<LessonAddPage />} />
            <Route path="add/clients" element={<UserSelectionPage />} />
            <Route path="add/products" element={<ProductSelectionPage />} />
            <Route path="edit/:id" element={<LessonEditPage />} />
            <Route path="edit/:id/clients" element={<UserSelectionPage />} />
            <Route
                path="edit/:id/products"
                element={<ProductSelectionPage />}
            />
        </Route>
    </Route>,
]
