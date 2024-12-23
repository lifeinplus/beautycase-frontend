import { Path, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AdaptiveNavBar, Header } from '../../../components'
import {
    CheckboxItem,
    InputItem,
    RadioButtonItem,
    TextareaItem,
} from '../../form'
import { Hero } from '../components/Hero'

interface FormData {
    name: string
    instagram: string
    city?: string
    age?: number
    makeupBag: string
    procedures: {
        lashExtensions?: boolean
        browCorrection?: boolean
        lashLamination?: boolean
        none?: boolean
    }
    skinType?: string
    allergies?: string
    peeling?: boolean
    pores?: boolean
    oilyShine?: boolean
    currentSkills?: string
    desiredSkills?: string
    makeupTime?: string
    budget?: string
    brushes?: boolean
    problems: {
        eyeshadowCrease?: boolean
        mascaraSmudge?: boolean
        foundationPores?: boolean
        foundationStay?: boolean
        sculpting?: boolean
        eyeshadowMatch?: boolean
        other?: string
    }
    referral?: string
}

const schema = yup.object({
    name: yup.string().required('Имя обязательно для заполнения'),
    instagram: yup.string().required('Укажите ник в Инстаграм'),
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
    desiredSkills: yup.string(),
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

    const procedures: { id: string; label: string; name: Path<FormData> }[] = [
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
    ]

    const skinTypes = [
        { id: 'skin-type-normal', label: 'Нормальная' },
        { id: 'skin-type-dry', label: 'Сухая' },
        { id: 'skin-type-combination', label: 'Комбинированная' },
        { id: 'skin-type-oily', label: 'Жирная' },
    ]

    const peeling = [
        { id: 'peeling-yes', label: 'Да' },
        { id: 'peeling-no', label: 'Нет' },
    ]

    const pores = [
        { id: 'pores-yes', label: 'Да' },
        { id: 'pores-no', label: 'Нет' },
    ]

    const oilyShine = [
        { id: 'oily-shine-yes', label: 'Да' },
        { id: 'oily-shine-no', label: 'Нет' },
    ]

    const makeupTime = [
        { id: 'makeup-time-up-to-15-min', label: 'До 15 минут' },
        { id: 'makeup-time-15-25-min', label: '15-25 минут' },
        { id: 'makeup-time-30-60-min', label: '30-60 минут' },
    ]

    const budget = [
        { id: 'budget-up-to-30-eur', label: 'До 30 евро' },
        { id: 'budget-30-50-eur', label: '30-50 евро' },
        { id: 'budget-50-100-eur', label: '50-100 евро' },
        { id: 'budget-more-than-100-eur', label: 'Более 100 евро' },
    ]

    const brushes = [
        { id: 'brushes-yes', label: 'Да' },
        { id: 'brushes-no', label: 'Нет' },
    ]

    const problems: { id: string; label: string; name: Path<FormData> }[] = [
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
    ]

    const referral = [
        { id: 'referral-instagram', label: 'Instagram' },
        { id: 'referral-youtube', label: 'YouTube' },
        { id: 'referral-other', label: 'Другое' },
    ]

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

                            <InputItem
                                error={errors.name}
                                label="Имя"
                                register={register('name')}
                                required={true}
                                type="text"
                            />

                            <InputItem
                                error={errors.instagram}
                                label="Ник в Инстаграм"
                                register={register('instagram')}
                                required={true}
                                type="text"
                            />

                            <InputItem
                                label="Город проживания"
                                register={register('city')}
                                type="text"
                            />

                            <InputItem
                                label="Возраст"
                                register={register('age')}
                                type="number"
                            />

                            <InputItem
                                error={errors.makeupBag}
                                label="Что сейчас уже есть в косметичке?"
                                register={register('makeupBag')}
                                required={true}
                                type="text"
                            />

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        Делаете ли какие-то из этих процедур на
                                        постоянной основе?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {procedures.map((item) => (
                                            <CheckboxItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register(item.name)}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <div>
                                <label className="block">
                                    <span className="form-label">Тип кожи</span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {skinTypes.map((item) => (
                                            <RadioButtonItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register('skinType')}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <TextareaItem
                                label="Есть ли аллергия? На что (если есть)?"
                                register={register('allergies')}
                            />

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        Бывают ли шелушения?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {peeling.map((item) => (
                                            <RadioButtonItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register('peeling')}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        Заметны ли поры?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {pores.map((item) => (
                                            <RadioButtonItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register('pores')}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        Появляется ли жирный блеск в течение
                                        дня?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {oilyShine.map((item) => (
                                            <RadioButtonItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register('oilyShine')}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <TextareaItem
                                label="Что уже умеете? Какие виды макияжа
                                        делаете сейчас?"
                                register={register('currentSkills')}
                            />

                            <TextareaItem
                                label="Какие виды макияжа хотите научиться делать в будущем (нежные/вечерние/яркие/офисный вариант/свой вариант)?"
                                register={register('desiredSkills')}
                            />

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        Сколько времени чаще всего выделяете на
                                        макияж?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {makeupTime.map((item) => (
                                            <RadioButtonItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register(
                                                    'makeupTime'
                                                )}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        Какой бюджет закладываете на косметичку?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {budget.map((item) => (
                                            <RadioButtonItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register('budget')}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        Нужен ли подбор кистей?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {brushes.map((item) => (
                                            <RadioButtonItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register('brushes')}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        С какими проблемами сталкивались при
                                        выполнении макияжа?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {problems.map((item) => (
                                            <CheckboxItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register(item.name)}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            <div>
                                <label className="block">
                                    <span className="form-label">
                                        Откуда узнали про меня?
                                    </span>
                                </label>

                                <div className="relative flex flex-col rounded-xl border border-neutral-200 bg-white shadow focus-within:border-black dark:border-neutral-700 dark:bg-black dark:focus-within:border-white">
                                    <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                                        {referral.map((item) => (
                                            <RadioButtonItem
                                                key={item.id}
                                                id={item.id}
                                                label={item.label}
                                                register={register('referral')}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </article>

                        <section>
                            <button
                                type="submit"
                                className="rounded-md bg-blue-500 px-4 py-2 text-white"
                            >
                                Отправить
                            </button>
                        </section>
                    </form>
                </section>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
