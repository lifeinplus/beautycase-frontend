import { useTranslation } from 'react-i18next'

import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import { ImageField } from '@/features/questionnaires/ui/ImageField'
import { InstagramField } from '@/features/questionnaires/ui/InstagramField'
import { MuaField } from '@/features/questionnaires/ui/MuaField'
import { TextField } from '@/features/questionnaires/ui/TextField'

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
    const { t } = useTranslation('questionnaire')

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
                            {f === 'mua' ? (
                                <MuaField mua={data.mua} />
                            ) : f === 'instagram' ? (
                                <InstagramField username={data.instagram} />
                            ) : f === 'makeupBagPhotoId' ? (
                                <ImageField value={data.makeupBagPhotoId} />
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
