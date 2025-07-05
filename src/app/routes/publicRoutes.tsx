import { Route } from 'react-router-dom'
import { HomePage } from '@/features/home/pages/HomePage'
import { ConfirmationPage } from '@/features/questionnaires/pages/ConfirmationPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { QuestionnairePage } from '@/features/questionnaires/pages/QuestionnairePage'
import { UnauthorizedPage } from '@/features/auth/pages/UnauthorizedPage'

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
