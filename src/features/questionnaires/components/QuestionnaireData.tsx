import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import config from '@/app/config'
import dlStyles from '@/shared/components/ui/description-list.module.css'
import cloudinary from '@/shared/utils/cloudinary'
import { type QuestionnaireResultOption } from '../options'
import type { Questionnaire } from '../types'
import { questions } from '../utils'

export interface QuestionnaireDataProps {
    data: Questionnaire
}

const fields: (keyof Questionnaire)[] = [
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

export const QuestionnaireData = ({ data }: QuestionnaireDataProps) => {
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
        value: Questionnaire[keyof Questionnaire],
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
                            {t(questions[f]?.label)}
                        </dt>
                        <dd className={dlStyles.dd}>
                            {f === 'makeupBagPhotoId'
                                ? renderImage(data?.[f])
                                : renderText(data?.[f], questions[f]?.options)}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
