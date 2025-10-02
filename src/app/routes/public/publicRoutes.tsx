import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { Login } from '@/pages/auth/login/Login'
import { Register } from '@/pages/auth/register/Register'
import { Unauthorized } from '@/pages/auth/unauthorized/Unauthorized'
import { Home } from '@/pages/home/Home'
import { Pricing } from '@/pages/pricing/ui/Pricing'
import { Confirmation } from '@/pages/questionnaires/confirmation/Confirmation'
import { QuestionnaireGallery } from '@/pages/questionnaires/gallery/QuestionnaireGallery'
import { MakeupBagQuestionnaireCreate } from '@/pages/questionnaires/makeup-bag/create/MakeupBagQuestionnaireCreate'
import { TrainingCreate } from '@/pages/questionnaires/training/create/TrainingCreate'

export const publicRoutes = [
    <Route key="home" path="/" element={<Home />} />,
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route key="public-layout" element={<AppLayout />}>
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/questionnaires">
            <Route index element={<QuestionnaireGallery />} />
            <Route
                path="makeup-bag"
                element={<MakeupBagQuestionnaireCreate />}
            />
            <Route path="training" element={<TrainingCreate />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
    </Route>,
]
