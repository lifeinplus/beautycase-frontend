import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { QuestionnaireList } from '@/pages/questionnaires/list/QuestionnaireList'
import { QuestionnaireResult } from '@/pages/questionnaires/result/QuestionnaireResult'
import { Layout } from '@/shared/components/layout/Layout'

export const questionnaireRoutes = [
    <Route key="questionnaires" path="/questionnaires">
        <Route element={<Layout />}>
            <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
                <Route index element={<QuestionnaireList />} />
                <Route path=":id" element={<QuestionnaireResult />} />
            </Route>
        </Route>
    </Route>,
]
