import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { MakeupBagQuestionnaireList } from '@/pages/questionnaires/makeup-bag/list/MakeupBagQuestionnaireList'
import { MakeupBagQuestionnaireResult } from '@/pages/questionnaires/makeup-bag/result/MakeupBagQuestionnaireResult'
import { TrainingQuestionnaireList } from '@/pages/questionnaires/training/list/TrainingQuestionnaireList'
import { TrainingQuestionnaireResult } from '@/pages/questionnaires/training/result/TrainingQuestionnaireResult'

export const questionnaireRoutes = [
    <Route key="questionnaires" path="/questionnaires" element={<AppLayout />}>
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route path="makeup-bags">
                <Route index element={<MakeupBagQuestionnaireList />} />
                <Route path=":id" element={<MakeupBagQuestionnaireResult />} />
            </Route>
            <Route path="trainings">
                <Route index element={<TrainingQuestionnaireList />} />
                <Route path=":id" element={<TrainingQuestionnaireResult />} />
            </Route>
        </Route>
    </Route>,
]
