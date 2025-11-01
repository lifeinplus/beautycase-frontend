import { useTranslation } from 'react-i18next'

import { MuaField } from '@/features/questionnaires/ui/MuaField'
import { TextField } from '@/features/questionnaires/ui/TextField'
import type { TrainingQuestionnaire } from '../../../types'
import { trainingQuestionnaireQuestions } from '../../questions/trainingQuestionnaireQuestions'

export interface TrainingQuestionnaireDataProps {
    data: TrainingQuestionnaire
}

const fields: (keyof TrainingQuestionnaire)[] = [
    'mua',
    'name',
    'contact',
    'experience',
    'difficulties',
    'expectations',
]

export const TrainingQuestionnaireData = ({
    data,
}: TrainingQuestionnaireDataProps) => {
    const { t } = useTranslation(['questionnaire'])

    return (
        <div className="sm:rounded-2.5xl pb-4 sm:border sm:border-neutral-200 sm:pb-0 dark:sm:border-neutral-700">
            <dl className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {fields.map((f) => (
                    <div
                        key={f}
                        className="px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4"
                    >
                        <dt className="text-xs font-medium text-neutral-600 sm:text-xs/6 dark:text-neutral-400">
                            {t(trainingQuestionnaireQuestions[f]?.label)}
                        </dt>
                        <dd className="pt-1 sm:col-span-2 sm:pt-0">
                            {f === 'mua' ? (
                                <MuaField mua={data.mua} />
                            ) : (
                                <TextField
                                    value={data?.[f]}
                                    options={
                                        trainingQuestionnaireQuestions[f]
                                            ?.options
                                    }
                                />
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
