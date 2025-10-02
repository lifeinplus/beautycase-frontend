import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { QuestionnaireList } from '@/pages/questionnaires/list/QuestionnaireList'
import { QuestionnaireResult } from '@/pages/questionnaires/result/QuestionnaireResult'
import { TrainingList } from '@/pages/questionnaires/training/list/TrainingList'
import { TrainingResult } from '@/pages/questionnaires/training/result/TrainingResult'

export const questionnaireRoutes = [
    <Route key="questionnaires" path="/questionnaires" element={<AppLayout />}>
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route path="results">
                <Route path="questionnaire" element={<QuestionnaireList />} />
                <Route path="training" element={<TrainingList />} />
            </Route>
            <Route path=":id" element={<QuestionnaireResult />} />
            <Route path="trainings/:id" element={<TrainingResult />} />
        </Route>
    </Route>,
]
