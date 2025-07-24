import { Route } from 'react-router-dom'

import { Login } from '@/pages/auth/login/Login'
import { Register } from '@/pages/auth/register/Register'
import { Unauthorized } from '@/pages/auth/unauthorized/Unauthorized'
import { Home } from '@/pages/home/Home'
import { ConfirmationPage } from '@/pages/questionnaire/ConfirmationPage'
import { QuestionnairePage } from '@/pages/questionnaire/QuestionnairePage'
import { Layout } from '@/shared/components/layout/Layout'

export const publicRoutes = [
    <Route key="home" path="/" element={<Home />} />,
    <Route
        key="confirmation"
        path="/confirmation"
        element={<ConfirmationPage />}
    />,
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="register" path="/register" element={<Register />} />,
    <Route
        key="questionnaire"
        path="/questionnaire"
        element={<QuestionnairePage />}
    />,
    <Route key={'unauthorized-layout'} element={<Layout />}>
        <Route
            key="unauthorized"
            path="/unauthorized"
            element={<Unauthorized />}
        />
    </Route>,
]
