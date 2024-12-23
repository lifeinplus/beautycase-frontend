import { Path, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AdaptiveNavBar, Header, NavigationButton } from '../../../components'
import {
    CheckboxSection,
    InputSection,
    RadioButtonSection,
    TextareaSection,
} from '../../form'
import { Hero } from '../components/Hero'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

export interface Option {
    id: string
    label: string
    name: Path<FormData>
}

interface ProcedureData {
    lashExtensions?: boolean
    browCorrection?: boolean
    lashLamination?: boolean
    none?: boolean
}

interface DesiredSkillData {
    delicate?: boolean
    evening?: boolean
    bright?: boolean
    office?: boolean
}

interface ProblemData {
    eyeshadowCrease?: boolean
    mascaraSmudge?: boolean
    foundationPores?: boolean
    foundationStay?: boolean
    sculpting?: boolean
    eyeshadowMatch?: boolean
}

export interface FormData {
    name: string
    instagram: string
    city?: string
    age?: number
    makeupBag: string
    procedures: ProcedureData
    skinType?: string
    allergies?: string
    peeling?: boolean
    pores?: boolean
    oilyShine?: boolean
    currentSkills?: string
    desiredSkills: DesiredSkillData
    makeupTime?: string
    budget?: string
    brushes?: boolean
    problems: ProblemData
    referral?: string
}

const schema = yup.object({
    name: yup.string().required('Укажите ваше имя'),
    instagram: yup.string().required('Укажите псевдоним в Instagram'),
    city: yup.string(),
    age: yup.number(),
    makeupBag: yup.string().required('Укажите, что сейчас есть в косметичке'),
    procedures: yup.object({
        lashExtensions: yup.boolean(),
        browCorrection: yup.boolean(),
        lashLamination: yup.boolean(),
        none: yup.boolean(),
    }),
    skinType: yup.string(),
    allergies: yup.string(),
    peeling: yup.boolean(),
    pores: yup.boolean(),
    oilyShine: yup.boolean(),
    currentSkills: yup.string(),
    desiredSkills: yup.object({
        delicate: yup.boolean(),
        evening: yup.boolean(),
        bright: yup.boolean(),
        office: yup.boolean(),
    }),
    makeupTime: yup.string(),
    budget: yup.string(),
    brushes: yup.boolean(),
    problems: yup.object({
        eyeshadowCrease: yup.boolean(),
        mascaraSmudge: yup.boolean(),
        foundationPores: yup.boolean(),
        foundationStay: yup.boolean(),
        sculpting: yup.boolean(),
        eyeshadowMatch: yup.boolean(),
        other: yup.string(),
    }),
    referral: yup.string(),
})

export const QuestionnairePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    const options: {
        procedures: Option[]
        skinTypes: Option[]
        peeling: Option[]
        pores: Option[]
        oilyShine: Option[]
        desiredSkills: Option[]
        makeupTime: Option[]
        budget: Option[]
        brushes: Option[]
        problems: Option[]
        referral: Option[]
    } = {
        procedures: [
            {
                id: 'procedure-lash-extensions',
                label: 'Наращивание ресниц',
                name: 'procedures.lashExtensions',
            },
            {
                id: 'procedure-brow-correction',
                label: 'Коррекция и покраска бровей',
                name: 'procedures.browCorrection',
            },
            {
                id: 'procedure-lash-lamination',
                label: 'Ламинирование, покраска ресниц',
                name: 'procedures.lashLamination',
            },
            {
                id: 'procedure-none',
                label: 'Не делаю',
                name: 'procedures.none',
            },
        ],
        skinTypes: [
            {
                id: 'skin-type-normal',
                label: 'Нормальная',
                name: 'skinType',
            },
            {
                id: 'skin-type-dry',
                label: 'Сухая',
                name: 'skinType',
            },
            {
                id: 'skin-type-combination',
                label: 'Комбинированная',
                name: 'skinType',
            },
            {
                id: 'skin-type-oily',
                label: 'Жирная',
                name: 'skinType',
            },
        ],
        peeling: [
            { id: 'peeling-yes', label: 'Да', name: 'peeling' },
            { id: 'peeling-no', label: 'Нет', name: 'peeling' },
        ],
        pores: [
            { id: 'pores-yes', label: 'Да', name: 'pores' },
            { id: 'pores-no', label: 'Нет', name: 'pores' },
        ],
        oilyShine: [
            { id: 'oily-shine-yes', label: 'Да', name: 'oilyShine' },
            { id: 'oily-shine-no', label: 'Нет', name: 'oilyShine' },
        ],
        desiredSkills: [
            {
                id: 'desired-skill-delicate',
                label: 'Нежный',
                name: 'desiredSkills.delicate',
            },
            {
                id: 'desired-skill-evening',
                label: 'Вечерний',
                name: 'desiredSkills.evening',
            },
            {
                id: 'desired-skill-bright',
                label: 'Яркий',
                name: 'desiredSkills.bright',
            },
            {
                id: 'desired-skill-office',
                label: 'Офисный вариант',
                name: 'desiredSkills.office',
            },
        ],
        makeupTime: [
            {
                id: 'makeup-time-up-to-15-min',
                label: 'До 15 минут',
                name: 'makeupTime',
            },
            {
                id: 'makeup-time-15-25-min',
                label: '15-25 минут',
                name: 'makeupTime',
            },
            {
                id: 'makeup-time-30-60-min',
                label: '30-60 минут',
                name: 'makeupTime',
            },
        ],
        budget: [
            {
                id: 'budget-up-to-30-eur',
                label: 'До 30 евро',
                name: 'budget',
            },
            {
                id: 'budget-30-50-eur',
                label: '30-50 евро',
                name: 'budget',
            },
            {
                id: 'budget-50-100-eur',
                label: '50-100 евро',
                name: 'budget',
            },
            {
                id: 'budget-more-than-100-eur',
                label: 'Более 100 евро',
                name: 'budget',
            },
        ],
        brushes: [
            { id: 'brushes-yes', label: 'Да', name: 'brushes' },
            { id: 'brushes-no', label: 'Нет', name: 'brushes' },
        ],
        problems: [
            {
                id: 'problem-eyeshadow-crease',
                label: 'Скатываются тени',
                name: 'problems.eyeshadowCrease',
            },
            {
                id: 'problem-mascara-smudge',
                label: 'Отпечатывается тушь',
                name: 'problems.mascaraSmudge',
            },
            {
                id: 'problem-foundation-pores',
                label: 'Тон проваливается в поры',
                name: 'problems.foundationPores',
            },
            {
                id: 'problem-foundation-stay',
                label: 'Тон плохо держится',
                name: 'problems.foundationStay',
            },
            {
                id: 'problem-sculpting',
                label: 'Не умею делать скульптурирование',
                name: 'problems.sculpting',
            },
            {
                id: 'problem-eyeshadow-match',
                label: 'Не знаю, какие тени подходят под мой цвет глаз',
                name: 'problems.eyeshadowMatch',
            },
        ],
        referral: [
            {
                id: 'referral-instagram',
                label: 'Instagram',
                name: 'referral',
            },
            {
                id: 'referral-youtube',
                label: 'YouTube',
                name: 'referral',
            },
            {
                id: 'referral-other',
                label: 'Другое',
                name: 'referral',
            },
        ],
    }

    const onSubmit = (data: any) => {
        console.log('Form Data:', data)
    }

    return (
        <article>
            <Header />

            <main className="page-content flex flex-col items-center justify-center">
                <section className="w-full max-w-2xl">
                    <Hero />

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <article className="my-4 bg-gray-100 p-4 dark:bg-gray-900 sm:rounded">
                            <p className="mb-2 text-sm text-rose-500 dark:text-rose-400">
                                * Обязательно для заполнения
                            </p>

                            <InputSection
                                error={errors.name}
                                label="Имя"
                                register={register('name')}
                                required={true}
                                type="text"
                            />

                            <InputSection
                                error={errors.instagram}
                                label="Псевдоним в Instagram"
                                register={register('instagram')}
                                required={true}
                                type="text"
                            />

                            <InputSection
                                label="Город проживания"
                                register={register('city')}
                                type="text"
                            />

                            <InputSection
                                label="Возраст"
                                register={register('age')}
                                type="number"
                            />

                            <InputSection
                                error={errors.makeupBag}
                                label="Что сейчас уже есть в косметичке?"
                                register={register('makeupBag')}
                                required={true}
                                type="text"
                            />

                            <CheckboxSection
                                label="Делаете ли какие-то из этих процедур на постоянной основе?"
                                options={options.procedures}
                                register={register}
                            />

                            <RadioButtonSection
                                label="Тип кожи"
                                options={options.skinTypes}
                                register={register}
                            />

                            <TextareaSection
                                label="Есть ли аллергия? На что (если есть)?"
                                register={register('allergies')}
                            />

                            <RadioButtonSection
                                label="Бывают ли шелушения?"
                                options={options.peeling}
                                register={register}
                            />

                            <RadioButtonSection
                                label="Заметны ли поры?"
                                options={options.pores}
                                register={register}
                            />

                            <RadioButtonSection
                                label="Появляется ли жирный блеск в течение дня?"
                                options={options.oilyShine}
                                register={register}
                            />

                            <TextareaSection
                                label="Что уже умеете?  
                                        делаете сейчас?"
                                register={register('currentSkills')}
                            />

                            <CheckboxSection
                                label="Какие виды макияжа хотите научиться делать в будущем?"
                                options={options.desiredSkills}
                                register={register}
                            />

                            <RadioButtonSection
                                label="Сколько времени чаще всего выделяете на макияж?"
                                options={options.makeupTime}
                                register={register}
                            />

                            <RadioButtonSection
                                label="Какой бюджет закладываете на косметичку?"
                                options={options.budget}
                                register={register}
                            />

                            <RadioButtonSection
                                label="Нужен ли подбор кистей?"
                                options={options.brushes}
                                register={register}
                            />

                            <CheckboxSection
                                label="С какими проблемами сталкивались при выполнении макияжа?"
                                options={options.problems}
                                register={register}
                            />

                            <RadioButtonSection
                                label="Откуда узнали про меня?"
                                options={options.referral}
                                register={register}
                            />
                        </article>
                    </form>
                </section>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<PaperAirplaneIcon className="h-6 w-6" />}
                    text="Отправить"
                    onClick={handleSubmit(onSubmit)}
                />
            </AdaptiveNavBar>
        </article>
    )
}
