import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { ProductSelectionForLesson } from '@/features/products/wrappers/selection/lesson/ProductSelectionForLesson'
import { LessonAdd } from '@/pages/lessons/add/LessonAdd'
import { LessonDetails } from '@/pages/lessons/details/LessonDetails'
import { LessonEdit } from '@/pages/lessons/edit/LessonEdit'
import { LessonGallery } from '@/pages/lessons/gallery/LessonGallery'
import { UserSelection } from '@/pages/users/UserSelection'

export const lessonRoutes = [
    <Route key="lessons" path="/lessons" element={<AppLayout />}>
        <Route path=":id" element={<LessonDetails />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<LessonGallery />} />
            <Route path=":id/edit" element={<LessonEdit />} />
            <Route path=":id/edit/clients" element={<UserSelection />} />
            <Route
                path=":id/products"
                element={<ProductSelectionForLesson />}
            />
            <Route path="add" element={<LessonAdd />} />
            <Route path="add/clients" element={<UserSelection />} />
        </Route>
    </Route>,
]
