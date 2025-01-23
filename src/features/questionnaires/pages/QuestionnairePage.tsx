import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar, Header, Hero } from '../../../components'
import { appendToFormData, getErrorMessage } from '../../../utils'
import {
    CheckboxSection,
    FileSection,
    InputSection,
    RadioButtonSection,
    TextareaSection,
} from '../../form'
import { options } from '../options'
import type { Questionnaire } from '../types'
import { schema } from '../validations'
import { useAddQuestionnaireMutation } from '../questionnaireApiSlice'
import { questions } from '../utils'

export const QuestionnairePage = () => {
    const navigate = useNavigate()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Questionnaire>({
        resolver: yupResolver(schema),
    })

    const [addQuestionnaire] = useAddQuestionnaireMutation()

    const onSubmit = async (data: Questionnaire) => {
        const formData = appendToFormData(data)

        try {
            await addQuestionnaire(formData).unwrap()
            reset()
            navigate('/confirmation')
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <article>
            <Header />

            <main className="page-content">
                <article className="content-container">
                    <Hero
                        headline="Анкета"
                        byline="Индивидуальный подбор косметички"
                        imgUrl="https://res.cloudinary.com/dtx4nqyeb/image/upload/v1734995126/Questionnaire_cqv0mc.jpg"
                        content="Привет! Спасибо за выбор моей услуги. Для того, чтобы я могла максимально точно подобрать то, что нужно именно вам, прошу ответить на некоторые вопросы."
                    />

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="form-questionnaire"
                    >
                        <article className="px-3">
                            <p className="text-sm text-rose-500 dark:text-rose-400">
                                * Обязательно для заполнения
                            </p>

                            <InputSection
                                error={errors.name}
                                label={questions.name.label}
                                register={register('name')}
                                required={true}
                                type="text"
                            />

                            <InputSection
                                description={questions.instagram.description}
                                label={questions.instagram.label}
                                register={register('instagram')}
                                type="text"
                            />

                            <InputSection
                                description={questions.city.description}
                                label={questions.city.label}
                                register={register('city')}
                                type="text"
                            />

                            <InputSection
                                label={questions.age.label}
                                register={register('age')}
                                type="number"
                            />

                            <InputSection
                                description={questions.makeupBag.description}
                                error={errors.makeupBag}
                                label={questions.makeupBag.label}
                                register={register('makeupBag')}
                                required={true}
                                type="text"
                            />

                            <FileSection
                                label={questions.makeupBagPhoto.label}
                                register={register('makeupBagPhoto')}
                            />

                            <CheckboxSection
                                description={questions.procedures.description}
                                label={questions.procedures.label}
                                options={options.procedures}
                                register={register}
                            />

                            <RadioButtonSection
                                label={questions.skinType.label}
                                options={options.skinTypes}
                                register={register}
                            />

                            <TextareaSection
                                description={questions.allergies.description}
                                label={questions.allergies.label}
                                register={register('allergies')}
                            />

                            <RadioButtonSection
                                description={questions.peeling.description}
                                horizontal={true}
                                label={questions.peeling.label}
                                options={options.peeling}
                                register={register}
                            />

                            <RadioButtonSection
                                description={questions.pores.description}
                                horizontal={true}
                                label={questions.pores.label}
                                options={options.pores}
                                register={register}
                            />

                            <RadioButtonSection
                                description={questions.oilyShine.description}
                                horizontal={true}
                                label={questions.oilyShine.label}
                                options={options.oilyShine}
                                register={register}
                            />

                            <TextareaSection
                                description={
                                    questions.currentSkills.description
                                }
                                label={questions.currentSkills.label}
                                register={register('currentSkills')}
                            />

                            <CheckboxSection
                                description={
                                    questions.desiredSkills.description
                                }
                                label={questions.desiredSkills.label}
                                options={options.desiredSkills}
                                register={register}
                            />

                            <RadioButtonSection
                                description={questions.makeupTime.description}
                                label={questions.makeupTime.label}
                                options={options.makeupTime}
                                register={register}
                            />

                            <RadioButtonSection
                                description={questions.budget.description}
                                label={questions.budget.label}
                                options={options.budget}
                                register={register}
                            />

                            <RadioButtonSection
                                description={questions.brushes.description}
                                horizontal={true}
                                label={questions.brushes.label}
                                options={options.brushes}
                                register={register}
                            />

                            <CheckboxSection
                                description={questions.problems.description}
                                label={questions.problems.label}
                                options={options.problems}
                                register={register}
                            />

                            <RadioButtonSection
                                description={questions.referral.description}
                                label={questions.referral.label}
                                options={options.referral}
                                register={register}
                            />
                        </article>

                        <section className="button-section">
                            <button type="submit" className="button">
                                Отправить
                            </button>
                        </section>
                    </form>
                </article>
            </main>

            <AdaptiveNavBar />
        </article>
    )
}
