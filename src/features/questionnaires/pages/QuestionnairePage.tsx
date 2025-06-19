import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { Header } from '../../../components/Header'
import { Hero } from '../../../components/Hero'
import { getErrorMessage } from '../../../utils/errorUtils'
import { CheckboxSection } from '../../form/components/CheckboxSection'
import { InputSection } from '../../form/components/InputSection'
import { ImageTextSection } from '../../form/components/ImageTextSection'
import { RadioButtonSection } from '../../form/components/RadioButtonSection'
import { TextareaSection } from '../../form/components/TextareaSection'
import { options } from '../options'
import type { Questionnaire } from '../types'
import { questionnaireSchema } from '../validations'
import { useCreateQuestionnaireMutation } from '../questionnairesApi'
import { questions } from '../utils'

export const QuestionnairePage = () => {
    const navigate = useNavigate()

    const {
        clearErrors,
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Questionnaire>({
        resolver: yupResolver(questionnaireSchema),
    })

    const [createQuestionnaire] = useCreateQuestionnaireMutation()

    const onSubmit = async (data: Questionnaire) => {
        try {
            await createQuestionnaire(data).unwrap()
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
                        imgUrl="https://res.cloudinary.com/beautycase/image/upload/v1734995126/Questionnaire_cqv0mc.jpg"
                        content="Привет! Спасибо за выбор моей услуги. Для того, чтобы я могла максимально точно подобрать то, что нужно именно вам, прошу ответить на некоторые вопросы."
                    />

                    <form
                        className="form-questionnaire"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
                            <p className="text-error text-sm">
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

                            <ImageTextSection
                                clearErrors={clearErrors}
                                description={questions.makeupBag.description}
                                folder="questionnaires"
                                error={errors.makeupBag}
                                label={questions.makeupBag.label}
                                labelUrl={questions.makeupBagPhotoUrl.label}
                                name={'makeupBag'}
                                nameUrl={'makeupBagPhotoUrl'}
                                register={register('makeupBag')}
                                registerUrl={register('makeupBagPhotoUrl')}
                                required={true}
                                setValue={setValue}
                                value={watch('makeupBag')}
                                valueUrl={watch('makeupBagPhotoUrl')}
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
                            <button className="button" type="submit">
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
