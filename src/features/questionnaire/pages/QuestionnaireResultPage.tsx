import { useNavigate, useParams } from 'react-router-dom'

import { AdaptiveNavBar, Hero, TopPanel } from '../../../components'
import { type QuestionnaireResultOption } from '../options'
import { useGetQuestionnaireByIdQuery } from '../questionnaireApiSlice'
import { Questionnaire } from '../types'
import { questions } from '../utils'

export const QuestionnaireResultPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const {
        data: questionnaire,
        isLoading,
        error,
    } = useGetQuestionnaireByIdQuery(id!)

    const fields: (keyof typeof questions)[] = [
        'name',
        'instagram',
        'city',
        'age',
        'makeupBag',
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

    const renderValue = (
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
                .map((item) => options?.find((o) => o.value === item)?.label)
                .join(' • ') ||
            value?.toString() ||
            'Не указано'
        )
    }

    if (isLoading || error || !questionnaire) {
        return <div>Error loading questionnaire</div>
    }

    const handleBack = () => {
        navigate('/questionnaires')
    }

    return (
        <article>
            <TopPanel title="Результаты анкеты" onBack={handleBack} />

            <main className="page-content">
                <section className="w-full max-w-2xl sm:space-y-6">
                    <article className="page-content__container page-content__container-xl">
                        <div className="hidden sm:block">
                            <Hero headline="Результаты анкеты" />
                        </div>

                        <div className="sm:rounded-2.5xl pb-4 sm:border sm:border-gray-200 sm:pb-0 sm:dark:border-neutral-800">
                            <dl className="grid grid-cols-1">
                                {fields.map((f) => (
                                    <div
                                        key={f}
                                        className="border-b border-gray-200 px-3 py-3 last:border-b-0 dark:border-neutral-800 sm:first:border-t-0 sm:dark:border-neutral-800"
                                    >
                                        <dt className="text-xs font-medium dark:text-neutral-400">
                                            {questions[f]?.label}
                                        </dt>
                                        <dd className="mt-1">
                                            {renderValue(
                                                questionnaire[
                                                    f as keyof Questionnaire
                                                ],
                                                questions[f]?.options
                                            )}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
