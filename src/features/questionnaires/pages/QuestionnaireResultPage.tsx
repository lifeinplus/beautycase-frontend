import { useNavigate, useParams } from 'react-router-dom'

import {
    AdaptiveNavBar,
    DataWrapper,
    Hero,
    TopPanel,
} from '../../../components'
import { formatDate } from '../../../utils'
import { type QuestionnaireResultOption } from '../options'
import { useGetQuestionnaireByIdQuery } from '../questionnaireApiSlice'
import type { Questionnaire } from '../types'
import { questions } from '../utils'

const fields: (keyof Questionnaire)[] = [
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

export const QuestionnaireResultPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data, isLoading, error } = useGetQuestionnaireByIdQuery(id!)

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
                .map((r) => options?.find((o) => o.value === r)?.label)
                .join(' • ') ||
            value?.toString() ||
            'Не указано'
        )
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
                            <Hero
                                headline="Результаты анкеты"
                                byline={formatDate(
                                    data?.createdAt,
                                    'dd.MM.yyyy HH:mm'
                                )}
                            />
                        </div>

                        <DataWrapper
                            isLoading={isLoading}
                            error={error}
                            data={data}
                            emptyMessage="Анкета не найдена"
                        >
                            <div className="dl-container">
                                <dl className="dl">
                                    {fields.map((f) => (
                                        <div key={f} className="dl-grid">
                                            <dt className="dt">
                                                {questions[f]?.label}
                                            </dt>
                                            <dd className="dd">
                                                {renderValue(
                                                    data?.[f],
                                                    questions[f]?.options
                                                )}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </DataWrapper>
                    </article>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
