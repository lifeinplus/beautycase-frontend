import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { QuestionnaireListPage } from '@/pages/questionnaire/QuestionnaireListPage'
import { QuestionnaireResultPage } from '@/pages/questionnaire/QuestionnaireResultPage'

export const questionnaireRoutes = [
    <Route key="questionnaires" path="/questionnaires">
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<QuestionnaireListPage />} />
            <Route path=":id" element={<QuestionnaireResultPage />} />
        </Route>
    </Route>,
]
