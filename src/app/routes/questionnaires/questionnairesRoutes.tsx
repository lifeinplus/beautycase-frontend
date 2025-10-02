import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { MakeupBagQuestionnaireList } from '@/pages/questionnaires/makeup-bag/list/MakeupBagQuestionnaireList'
import { MakeupBagQuestionnaireResult } from '@/pages/questionnaires/makeup-bag/result/MakeupBagQuestionnaireResult'
import { TrainingList } from '@/pages/questionnaires/training/list/TrainingList'
import { TrainingResult } from '@/pages/questionnaires/training/result/TrainingResult'

export const questionnaireRoutes = [
    <Route key="questionnaires" path="/questionnaires" element={<AppLayout />}>
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route path="makeup-bags">
                <Route index element={<MakeupBagQuestionnaireList />} />
                <Route path=":id" element={<MakeupBagQuestionnaireResult />} />
            </Route>
            <Route path="trainings">
                <Route index element={<TrainingList />} />
                <Route path=":id" element={<TrainingResult />} />
            </Route>
        </Route>
    </Route>,
]
