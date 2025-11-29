import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { Login } from '@/pages/auth/login/Login'
import { Register } from '@/pages/auth/register/Register'
import { Unauthorized } from '@/pages/auth/unauthorized/Unauthorized'
import { Home } from '@/pages/home/Home'
import { LessonDetails } from '@/pages/lessons/details/LessonDetails'
import { MakeupBagDetails } from '@/pages/makeup-bags/details/MakeupBagDetails'
import { Pricing } from '@/pages/pricing/ui/Pricing'
import { ProductDetails } from '@/pages/products/details/ProductDetails'
import { Confirmation } from '@/pages/questionnaires/confirmation/Confirmation'
import { QuestionnaireGallery } from '@/pages/questionnaires/gallery/QuestionnaireGallery'
import { MakeupBagQuestionnaireCreate } from '@/pages/questionnaires/makeup-bag/create/MakeupBagQuestionnaireCreate'
import { TrainingQuestionnaireCreate } from '@/pages/questionnaires/training/create/TrainingQuestionnaireCreate'
import { ToolDetails } from '@/pages/tools/details/ToolDetails'

export const publicRoutes = [
    <Route key="home" path="/" element={<Home />} />,
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route key="public-layout" element={<AppLayout />}>
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/lessons/:id" element={<LessonDetails viewMode />} />
        <Route path="/makeup-bags/:id" element={<MakeupBagDetails />} />
        <Route path="/products/:id" element={<ProductDetails viewMode />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/questionnaires">
            <Route index element={<QuestionnaireGallery />} />
            <Route
                path="makeup-bag"
                element={<MakeupBagQuestionnaireCreate />}
            />
            <Route path="training" element={<TrainingQuestionnaireCreate />} />
        </Route>

        <Route path="/tools/:id" element={<ToolDetails viewMode />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
    </Route>,
]
