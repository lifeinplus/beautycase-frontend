import { useParams } from 'react-router-dom'

import { AdaptiveNavBar, Header, Hero } from '../../../components'
import { type QuestionnaireResultOption } from '../options'
import { useGetQuestionnaireByIdQuery } from '../questionnaireApiSlice'
import { Questionnaire } from '../types'

interface Field {
    label: string
    key: keyof Questionnaire
    options?: QuestionnaireResultOption[]
}

export const QuestionnaireResultPage = () => {
    const { id } = useParams()

    const {
        data: questionnaire,
        isLoading,
        error,
    } = useGetQuestionnaireByIdQuery(id!)

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

    const fields: Field[] = [
        {
            key: 'name',
            label: 'Имя',
        },
        {
            key: 'instagram',
            label: 'Псевдоним в Instagram',
        },
        {
            key: 'city',
            label: 'Город проживания',
        },
        {
            key: 'age',
            label: 'Возраст',
        },
        {
            key: 'makeupBag',
            label: 'Что сейчас уже есть в косметичке?',
        },
        {
            key: 'procedures',
            label: 'Делаете ли какие-то из этих процедур на постоянной основе?',
            options: [
                {
                    label: 'Наращивание ресниц',
                    value: 'lashExtensions',
                },
                {
                    label: 'Коррекция и покраска бровей',
                    value: 'browCorrection',
                },
                {
                    label: 'Ламинирование, покраска ресниц',
                    value: 'lashLamination',
                },
                {
                    label: 'Не делаю',
                    value: 'none',
                },
            ],
        },
        {
            key: 'skinType',
            label: 'Тип кожи',
            options: [
                {
                    label: 'Нормальная',
                    value: 'normal',
                },
                {
                    label: 'Сухая',
                    value: 'dry',
                },
                {
                    label: 'Комбинированная',
                    value: 'combination',
                },
                {
                    label: 'Жирная',
                    value: 'oily',
                },
            ],
        },
        {
            key: 'allergies',
            label: 'Есть ли аллергия? На что (если есть)?',
        },
        {
            key: 'peeling',
            label: 'Бывают ли шелушения?',
            options: [
                {
                    label: 'Да',
                    value: 'yes',
                },
                {
                    label: 'Нет',
                    value: 'no',
                },
            ],
        },
        {
            key: 'pores',
            label: 'Заметны ли поры?',
            options: [
                {
                    label: 'Да',
                    value: 'yes',
                },
                {
                    label: 'Нет',
                    value: 'no',
                },
            ],
        },
        {
            key: 'oilyShine',
            label: 'Появляется ли жирный блеск в течение дня?',
            options: [
                {
                    label: 'Да',
                    value: 'yes',
                },
                {
                    label: 'Нет',
                    value: 'no',
                },
            ],
        },
        {
            key: 'currentSkills',
            label: 'Что уже умеете? Какие виды макияжа делаете сейчас?',
        },
        {
            key: 'desiredSkills',
            label: 'Какие виды макияжа хотите научиться делать в будущем?',
            options: [
                {
                    label: 'Нежный',
                    value: 'delicate',
                },
                {
                    label: 'Вечерний',
                    value: 'evening',
                },
                {
                    label: 'Яркий',
                    value: 'bright',
                },
                {
                    label: 'Офисный вариант',
                    value: 'office',
                },
                {
                    label: 'Для фото/видео съёмок',
                    value: 'filming',
                },
            ],
        },
        {
            key: 'makeupTime',
            label: 'Сколько времени чаще всего выделяете на макияж?',
            options: [
                {
                    label: 'До 15 минут',
                    value: '15',
                },
                {
                    label: '15-30 минут',
                    value: '15-30',
                },
                {
                    label: '30-60 минут',
                    value: '30-60',
                },
            ],
        },
        {
            key: 'budget',
            label: 'Какой бюджет закладываете на косметичку?',
            options: [
                {
                    label: 'До 50 евро',
                    value: '50',
                },
                {
                    label: '50-100 евро',
                    value: '50-100',
                },
                {
                    label: 'Более 100 евро',
                    value: '100',
                },
            ],
        },
        {
            key: 'brushes',
            label: 'Нужен ли подбор кистей?',
            options: [
                {
                    label: 'Да',
                    value: 'yes',
                },
                {
                    label: 'Нет',
                    value: 'no',
                },
            ],
        },
        {
            key: 'problems',
            label: 'С какими проблемами сталкивались при выполнении макияжа?',
            options: [
                {
                    label: 'Скатываются тени',
                    value: 'eyeshadowCrease',
                },
                {
                    label: 'Отпечатывается тушь',
                    value: 'mascaraSmudge',
                },
                {
                    label: 'Тон проваливается в поры',
                    value: 'foundationPores',
                },
                {
                    label: 'Тон плохо держится',
                    value: 'foundationStay',
                },
                {
                    label: 'Не умею делать скульптурирование',
                    value: 'sculpting',
                },
                {
                    label: 'Не знаю, какие тени подходят под мой цвет глаз',
                    value: 'eyeshadowMatch',
                },
            ],
        },
        {
            key: 'referral',
            label: 'Откуда узнали про меня?',
            options: [
                {
                    label: 'Instagram',
                    value: 'instagram',
                },
                {
                    label: 'YouTube',
                    value: 'youtube',
                },
                {
                    label: 'Личное знакомство',
                    value: 'personal',
                },
                {
                    label: 'По рекомендации',
                    value: 'recommendation',
                },
                {
                    label: 'Другое',
                    value: 'other',
                },
            ],
        },
    ]

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
                            {fields.map((field) => (
                                <div
                                    key={field.key}
                                    className="border-t border-gray-200 px-5 pt-4 dark:border-neutral-800 sm:first:border-t-0 sm:dark:border-neutral-800"
                                >
                                    <dt className="text-sm font-medium dark:text-neutral-400">
                                        {field.label}
                                    </dt>
                                    <dd className="mt-1">
                                        {renderValue(
                                            questionnaire[field.key],
                                            field.options
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
