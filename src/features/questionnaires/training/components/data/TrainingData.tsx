import { useTranslation } from 'react-i18next'

import dlStyles from '@/shared/components/ui/description-list/description-list.module.css'
import type {
    QuestionnaireResultOption,
    TrainingQuestionnaire,
} from '../../../types'
import { trainingQuestionnaireQuestions } from '../../questions/trainingQuestionnaireQuestions'

export interface TrainingDataProps {
    data: TrainingQuestionnaire
}

const fields: (keyof TrainingQuestionnaire)[] = [
    'name',
    'contact',
    'experience',
    'difficulties',
    'expectations',
]

export const TrainingData = ({ data }: TrainingDataProps) => {
    const { t } = useTranslation(['questionnaire'])

    const renderText = (
        value: TrainingQuestionnaire[keyof TrainingQuestionnaire],
        options?: QuestionnaireResultOption[]
    ): string => {
        let result = [value]

        if (
            typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null
        ) {
            result = Object.entries(value)
                .filter(([_, value]) => value)
                .map(([key]) => key)
        }

        return (
            result
                .map((r) => t(options?.find((o) => o.value === r)?.label || ''))
                .join(' • ') ||
            value?.toString() ||
            t('notSpecified')
        )
    }

    return (
        <div className={dlStyles.dlContainer}>
            <dl className={dlStyles.dl}>
                {fields.map((f) => (
                    <div key={f} className={dlStyles.dlGrid}>
                        <dt className={dlStyles.dt}>
                            {t(trainingQuestionnaireQuestions[f]?.label)}
                        </dt>
                        <dd className={dlStyles.dd}>
                            {renderText(
                                data?.[f],
                                trainingQuestionnaireQuestions[f]?.options
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
