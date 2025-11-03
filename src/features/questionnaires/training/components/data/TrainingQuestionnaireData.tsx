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
        <div className="md:rounded-2.5xl pb-4 md:border md:border-neutral-200 md:pb-0 dark:md:border-neutral-700">
            <dl className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {fields.map((f) => (
                    <div
                        key={f}
                        className="px-3 py-3 md:grid md:grid-cols-3 md:gap-2 md:px-4"
                    >
                        <dt className="text-xs font-medium text-neutral-600 md:text-xs/6 dark:text-neutral-400">
                            {t(trainingQuestionnaireQuestions[f]?.label)}
                        </dt>
                        <dd className="pt-1 md:col-span-2 md:pt-0">
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
