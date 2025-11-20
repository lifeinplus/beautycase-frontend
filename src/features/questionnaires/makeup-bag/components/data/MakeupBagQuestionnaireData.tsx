import { useTranslation } from 'react-i18next'

import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import { InstagramField } from '@/features/questionnaires/ui/InstagramField'
import { MuaField } from '@/features/questionnaires/ui/MuaField'
import { TextField } from '@/features/questionnaires/ui/TextField'
import { ImageSection } from '@/shared/components/forms/image/section/ImageSection'

export interface MakeupBagQuestionnaireDataProps {
    data: MakeupBagQuestionnaire
}

const fields: (keyof MakeupBagQuestionnaire)[] = [
    'mua',
    'name',
    'instagram',
    'city',
    'age',
    'makeupBag',
    'makeupBagPhotoIds',
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
    const { t } = useTranslation('questionnaire')

    return (
        <div className="md:rounded-2.5xl pb-4 md:border md:border-neutral-200 md:pb-0 dark:md:border-neutral-700">
            <dl className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {fields.map((f) => (
                    <div
                        key={f}
                        className="px-3 py-3 md:grid md:grid-cols-3 md:gap-2 md:px-4"
                    >
                        <dt className="text-xs font-medium text-neutral-600 md:text-xs/6 dark:text-neutral-400">
                            {t(makeupBagQuestionnaireQuestions[f]?.label)}
                        </dt>
                        <dd className="pt-1 md:col-span-2 md:pt-0">
                            {f === 'mua' ? (
                                <MuaField mua={data.mua} />
                            ) : f === 'instagram' ? (
                                <InstagramField username={data.instagram} />
                            ) : f === 'makeupBagPhotoIds' ? (
                                <ImageSection
                                    imageIds={data.makeupBagPhotoIds}
                                />
                            ) : (
                                <TextField
                                    value={data?.[f]}
                                    options={
                                        makeupBagQuestionnaireQuestions[f]
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
