import { Route } from 'react-router-dom'

import { RequireRole } from '../features/auth/components/RequireRole'
import { QuestionnaireListPage } from '../features/questionnaires/pages/QuestionnaireListPage'
import { QuestionnaireResultPage } from '../features/questionnaires/pages/QuestionnaireResultPage'

export const questionnaireRoutes = [
    <Route key="questionnaires" path="/questionnaires">
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<QuestionnaireListPage />} />
            <Route path=":id" element={<QuestionnaireResultPage />} />
        </Route>
    </Route>,
]
