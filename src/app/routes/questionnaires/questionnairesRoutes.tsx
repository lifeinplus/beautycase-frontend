import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { QuestionnaireList } from '@/pages/questionnaires/list/QuestionnaireList'
import { QuestionnaireResult } from '@/pages/questionnaires/result/QuestionnaireResult'

export const questionnaireRoutes = [
    <Route key="questionnaires" path="/questionnaires" element={<AppLayout />}>
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<QuestionnaireList />} />
            <Route path=":id" element={<QuestionnaireResult />} />
        </Route>
    </Route>,
]
