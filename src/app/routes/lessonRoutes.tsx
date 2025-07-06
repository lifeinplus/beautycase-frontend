import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { UserSelectionPage } from '@/features/users/pages/UserSelectionPage'
import { LessonAddPage } from '@/pages/lesson/LessonAddPage'
import { LessonDetailsPage } from '@/pages/lesson/LessonDetailsPage'
import { LessonEditPage } from '@/pages/lesson/LessonEditPage'
import { LessonsGalleryPage } from '@/pages/lesson/LessonsGalleryPage'
import { ProductSelectionPage } from '@/pages/product/ProductSelectionPage'

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
