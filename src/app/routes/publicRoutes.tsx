import { Route } from 'react-router-dom'

import { Login } from '@/pages/auth/login/Login'
import { Register } from '@/pages/auth/register/Register'
import { Unauthorized } from '@/pages/auth/unauthorized/Unauthorized'
import { Home } from '@/pages/home/Home'
import { Confirmation } from '@/pages/questionnaires/confirmation/Confirmation'
import { QuestionnaireCreate } from '@/pages/questionnaires/create/QuestionnaireCreate'
import { Layout } from '@/shared/components/layout/Layout'

export const publicRoutes = [
    <Route key="home" path="/" element={<Home />} />,
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route key={'public-layout'} element={<Layout />}>
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/questionnaire" element={<QuestionnaireCreate />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
    </Route>,
]
