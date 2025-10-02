import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'
import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import type {
    MakeupBagQuestionnaire,
    QuestionnaireResultOption,
} from '@/features/questionnaires/types'
import dlStyles from '@/shared/components/ui/description-list/description-list.module.css'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'

export interface MakeupBagQuestionnaireDataProps {
    data: MakeupBagQuestionnaire
}

const fields: (keyof MakeupBagQuestionnaire)[] = [
    'name',
    'instagram',
    'city',
    'age',
    'makeupBag',
    'makeupBagPhotoId',
    'procedures',
    'skinType',
    'allergies',
    'peeling',
    'pores',
    'oilyShine',
    'currentSkills',
    'desiredSkills',
    'makeupTime',
    'budget',
    'brushes',
    'problems',
    'referral',
]

export const MakeupBagQuestionnaireData = ({
    data,
}: MakeupBagQuestionnaireDataProps) => {
    const { t } = useTranslation(['questionnaire'])

    const renderImage = (value?: string): ReactNode => {
        const publicID = value || config.cloudinary.defaultThumbnailName
        const cldImg = cloudinary
            .image(publicID)
            .resize(scale().width(800))
            .format('auto')
            .quality('auto')
        return <AdvancedImage cldImg={cldImg} />
    }

    const renderText = (
        value: MakeupBagQuestionnaire[keyof MakeupBagQuestionnaire],
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
                            {t(makeupBagQuestionnaireQuestions[f]?.label)}
                        </dt>
                        <dd className={dlStyles.dd}>
                            {f === 'makeupBagPhotoId'
                                ? renderImage(data?.[f])
                                : renderText(
                                      data?.[f],
                                      makeupBagQuestionnaireQuestions[f]
                                          ?.options
                                  )}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
