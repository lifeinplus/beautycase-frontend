import { useParams } from 'react-router-dom'

import { AdaptiveNavBar, Header, Hero } from '../../../components'
import { type QuestionnaireResultOption } from '../options'
import { useGetQuestionnaireByIdQuery } from '../questionnaireApiSlice'
import { Questionnaire } from '../types'
import { questions } from '../utils'

export const QuestionnaireResultPage = () => {
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
        return <div>no data</div>
    }

    return (
        <article>
            <Header />

            <main className="page-content-questionnaire">
                <section className="w-full max-w-2xl space-y-6">
                    <Hero headline="Результаты анкеты" />

                    <div className="rounded border-gray-200 pb-8 dark:border-neutral-800 sm:border sm:pb-4">
                        <dl className="grid grid-cols-1 gap-4">
                            {fields.map((f) => (
                                <div
                                    key={f}
                                    className="border-t border-gray-200 px-3 pt-4 dark:border-neutral-800 sm:first:border-t-0 sm:dark:border-neutral-800"
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
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
