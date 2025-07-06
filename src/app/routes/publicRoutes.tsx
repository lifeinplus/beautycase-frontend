import { Route } from 'react-router-dom'
import { HomePage } from '@/pages/home/HomePage'
import { ConfirmationPage } from '@/pages/questionnaire/ConfirmationPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { QuestionnairePage } from '@/pages/questionnaire/QuestionnairePage'
import { UnauthorizedPage } from '@/pages/auth/UnauthorizedPage'

export const publicRoutes = [
    <Route key="home" path="/" element={<HomePage />} />,
    <Route
        key="confirmation"
        path="/confirmation"
        element={<ConfirmationPage />}
    />,
    <Route key="login" path="/login" element={<LoginPage />} />,
    <Route key="register" path="/register" element={<RegisterPage />} />,
    <Route
        key="questionnaire"
        path="/questionnaire"
        element={<QuestionnairePage />}
    />,
    <Route
        key="unauthorized"
        path="/unauthorized"
        element={<UnauthorizedPage />}
    />,
]
