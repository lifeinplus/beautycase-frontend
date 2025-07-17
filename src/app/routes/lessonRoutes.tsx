import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { ProductSelectionPageForLesson } from '@/features/products/wrappers/ProductSelectionPageForLesson'
import { LessonAddPage } from '@/pages/lesson/LessonAddPage'
import { LessonDetailsPage } from '@/pages/lesson/LessonDetailsPage'
import { LessonEditPage } from '@/pages/lesson/LessonEditPage'
import { LessonsGalleryPage } from '@/pages/lesson/LessonsGalleryPage'
import { UserSelectionPage } from '@/pages/user/UserSelectionPage'

export const lessonRoutes = [
    <Route key="lessons" path="/lessons">
        <Route path=":id" element={<LessonDetailsPage />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<LessonsGalleryPage />} />
            <Route
                path=":id/products"
                element={<ProductSelectionPageForLesson />}
            />
            <Route path="add" element={<LessonAddPage />} />
            <Route path="add/clients" element={<UserSelectionPage />} />
            <Route path="edit/:id" element={<LessonEditPage />} />
            <Route path="edit/:id/clients" element={<UserSelectionPage />} />
        </Route>
    </Route>,
]
