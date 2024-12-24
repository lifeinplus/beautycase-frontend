import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { AdaptiveNavBar, Header, NavigationButton } from '../../../components'
import { getErrorMessage } from '../../../utils'
import {
    CheckboxSection,
    InputSection,
    RadioButtonSection,
    TextareaSection,
} from '../../form'
import { Hero } from '../components/Hero'
import { options } from '../options'
import type { Questionnaire } from '../types'
import { schema } from '../validations'
import { useAddQuestionnaireMutation } from '../questionnaireApiSlice'

export const QuestionnairePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Questionnaire>({
        resolver: yupResolver(schema),
    })

    const [addQuestionnaire] = useAddQuestionnaireMutation()

    const onSubmit = async (data: any) => {
        try {
            const response = await addQuestionnaire(data).unwrap()
            console.log(response)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
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
                                horizontal={true}
                                label="Бывают ли шелушения?"
                                options={options.peeling}
                                register={register}
                            />

                            <RadioButtonSection
                                horizontal={true}
                                label="Заметны ли поры?"
                                options={options.pores}
                                register={register}
                            />

                            <RadioButtonSection
                                horizontal={true}
                                label="Появляется ли жирный блеск в течение дня?"
                                options={options.oilyShine}
                                register={register}
                            />

                            <TextareaSection
                                label="Что уже умеете? Какие виды макияжа делаете сейчас?"
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
                                horizontal={true}
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
