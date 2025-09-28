import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { Login } from '@/pages/auth/login/Login'
import { Register } from '@/pages/auth/register/Register'
import { Unauthorized } from '@/pages/auth/unauthorized/Unauthorized'
import { Home } from '@/pages/home/Home'
import { Pricing } from '@/pages/pricing/ui/Pricing'
import { Confirmation } from '@/pages/questionnaires/confirmation/Confirmation'
import { QuestionnaireCreate } from '@/pages/questionnaires/create/QuestionnaireCreate'
import { TrainingCreate } from '@/pages/questionnaires/create/training/TrainingCreate'

export const publicRoutes = [
    <Route key="home" path="/" element={<Home />} />,
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route key="public-layout" element={<AppLayout />}>
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/questionnaire" element={<QuestionnaireCreate />} />
        <Route path="/training" element={<TrainingCreate />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
    </Route>,
]
