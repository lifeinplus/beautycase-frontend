import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import config from '@/app/config/config'
import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import type {
    MakeupBagQuestionnaire,
    QuestionnaireOption,
} from '@/features/questionnaires/types'

import { Link } from '@/shared/components/ui/link/Link'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'
import { NotSpecified } from '../../../ui/NotSpecified'

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
        options?: QuestionnaireOption<MakeupBagQuestionnaire>[]
    ): ReactNode => {
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

        const text =
            result
                .map((r) => t(options?.find((o) => o.value === r)?.label || ''))
                .join(' • ') ||
            value?.toString() ||
            t('notSpecified')

        const isNotSpecified = text === t('notSpecified')

        return isNotSpecified ? <NotSpecified /> : text
    }

    const renderInstagramLink = (username?: string): ReactNode => {
        if (!username) return <NotSpecified />

        const cleanUsername = username.startsWith('@')
            ? username.slice(1)
            : username
        const url = `https://instagram.com/${cleanUsername}`

        return <Link url={url} text={`@${cleanUsername}`} />
    }

    return (
        <div className="sm:rounded-2.5xl pb-4 sm:border sm:border-neutral-200 sm:pb-0 dark:sm:border-neutral-700">
            <dl className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {fields.map((f) => (
                    <div
                        key={f}
                        className="px-3 py-3 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-4"
                    >
                        <dt className="text-xs font-medium text-neutral-600 sm:text-xs/6 dark:text-neutral-400">
                            {t(makeupBagQuestionnaireQuestions[f]?.label)}
                        </dt>
                        <dd className="pt-1 sm:col-span-2 sm:pt-0">
                            {f === 'makeupBagPhotoId'
                                ? renderImage(data?.[f])
                                : f === 'instagram'
                                  ? renderInstagramLink(data?.[f] as string)
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
