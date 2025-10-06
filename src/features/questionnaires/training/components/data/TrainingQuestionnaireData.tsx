import { useTranslation } from 'react-i18next'

import dlStyles from '@/shared/components/ui/description-list/description-list.module.css'
import type {
    QuestionnaireResultOption,
    TrainingQuestionnaire,
} from '../../../types'
import { trainingQuestionnaireQuestions } from '../../questions/trainingQuestionnaireQuestions'

export interface TrainingQuestionnaireDataProps {
    data: TrainingQuestionnaire
}

const fields: (keyof TrainingQuestionnaire)[] = [
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

    const renderText = (
        value: TrainingQuestionnaire[keyof TrainingQuestionnaire],
        options?: QuestionnaireResultOption[]
    ): string => {
        let result = [value]

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
