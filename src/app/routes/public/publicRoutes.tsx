import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { LessonDetailsForClient } from '@/features/lessons/wrappers/details/client/LessonDetailsForClient'
import { MakeupBagDetailsForClient } from '@/features/makeup-bags/wrappers/details/client/MakeupBagDetailsForClient'
import { ProductDetailsForClient } from '@/features/products/wrappers/details/client/ProductDetailsForClient'
import { ToolDetailsForClient } from '@/features/tools/wrappers/details/client/ToolDetailsForClient'
import { Login } from '@/pages/auth/login/Login'
import { Register } from '@/pages/auth/register/Register'
import { Unauthorized } from '@/pages/auth/unauthorized/Unauthorized'
import { Home } from '@/pages/home/Home'
import { Pricing } from '@/pages/pricing/ui/Pricing'
import { Confirmation } from '@/pages/questionnaires/confirmation/Confirmation'
import { QuestionnaireGallery } from '@/pages/questionnaires/gallery/QuestionnaireGallery'
import { MakeupBagQuestionnaireCreate } from '@/pages/questionnaires/makeup-bag/create/MakeupBagQuestionnaireCreate'
import { TrainingQuestionnaireCreate } from '@/pages/questionnaires/training/create/TrainingQuestionnaireCreate'

export const publicRoutes = [
    <Route key="home" path="/" element={<Home />} />,
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route key="public-layout" element={<AppLayout />}>
        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/lessons/:id" element={<LessonDetailsForClient />} />

        <Route
            path="/makeup-bags/:id"
            element={<MakeupBagDetailsForClient />}
        />

        <Route path="/products/:id" element={<ProductDetailsForClient />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/questionnaires">
            <Route index element={<QuestionnaireGallery />} />
            <Route
                path="makeup-bag"
                element={<MakeupBagQuestionnaireCreate />}
            />
            <Route path="training" element={<TrainingQuestionnaireCreate />} />
        </Route>

        <Route path="/tools/:id" element={<ToolDetailsForClient />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
    </Route>,
]
