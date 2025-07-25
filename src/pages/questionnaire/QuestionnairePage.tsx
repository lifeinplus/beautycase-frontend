import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { options } from '@/features/questionnaires/options'
import { useCreateQuestionnaireMutation } from '@/features/questionnaires/questionnairesApi'
import type { Questionnaire } from '@/features/questionnaires/types'
import { questions } from '@/features/questionnaires/utils'
import { questionnaireSchema } from '@/features/questionnaires/validations'
import commonStyles from '@/shared/components/common/common.module.css'
import { Hero } from '@/shared/components/common/Hero'
import { CheckboxSection } from '@/shared/components/forms/CheckboxSection'
import formStyles from '@/shared/components/forms/form.module.css'
import { ImageTextSection } from '@/shared/components/forms/ImageTextSection'
import { InputSection } from '@/shared/components/forms/InputSection'
import { RadioButtonSection } from '@/shared/components/forms/RadioButtonSection'
import { TextareaSection } from '@/shared/components/forms/TextareaSection'
import { Header } from '@/shared/components/layout/Header'
import { NavBar } from '@/shared/components/navigation/NavBar'
import buttonStyles from '@/shared/components/ui/button.module.css'
import { ButtonSubmit } from '@/shared/components/ui/ButtonSubmit'
import pageStyles from '@/shared/components/ui/page.module.css'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const QuestionnairePage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('questionnaire')

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

    const [createQuestionnaire, { isLoading }] =
        useCreateQuestionnaireMutation()

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

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={t('hero.headline')}
                        byline={t('hero.byline')}
                        imgUrl="https://res.cloudinary.com/beautycase/image/upload/v1734995126/Questionnaire_cqv0mc.jpg"
                        content={t('hero.content')}
                    />

                    <form
                        className={classNames(formStyles.form)}
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
                            <p
                                className={classNames(
                                    commonStyles.textDanger,
                                    'text-sm'
                                )}
                            >
                                {t('requiredField')}
                            </p>

                            <InputSection
                                error={t(errors.name?.message || '')}
                                label={t(questions.name.label)}
                                register={register('name')}
                                required={true}
                                type="text"
                            />

                            <InputSection
                                description={t(
                                    questions.instagram.description || ''
                                )}
                                label={t(questions.instagram.label)}
                                register={register('instagram')}
                                type="text"
                            />

                            <InputSection
                                description={t(
                                    questions.city.description || ''
                                )}
                                label={t(questions.city.label)}
                                register={register('city')}
                                type="text"
                            />

                            <InputSection
                                label={t(questions.age.label)}
                                register={register('age')}
                                type="number"
                            />

                            <ImageTextSection
                                clearErrors={clearErrors}
                                description={t(
                                    questions.makeupBag.description || ''
                                )}
                                folder="questionnaires"
                                error={t(errors.makeupBag?.message || '')}
                                label={t(questions.makeupBag.label)}
                                labelUrl={t(questions.makeupBagPhotoUrl.label)}
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
                                description={t(
                                    questions.procedures.description || ''
                                )}
                                label={t(questions.procedures.label)}
                                options={options.procedures}
                                register={register}
                            />

                            <RadioButtonSection
                                label={t(questions.skinType.label)}
                                options={options.skinTypes}
                                register={register}
                            />

                            <TextareaSection
                                description={t(
                                    questions.allergies.description || ''
                                )}
                                label={t(questions.allergies.label)}
                                register={register('allergies')}
                            />

                            <RadioButtonSection
                                description={t(
                                    questions.peeling.description || ''
                                )}
                                horizontal={true}
                                label={t(questions.peeling.label)}
                                options={options.peeling}
                                register={register}
                            />

                            <RadioButtonSection
                                description={t(
                                    questions.pores.description || ''
                                )}
                                horizontal={true}
                                label={t(questions.pores.label)}
                                options={options.pores}
                                register={register}
                            />

                            <RadioButtonSection
                                description={t(
                                    questions.oilyShine.description || ''
                                )}
                                horizontal={true}
                                label={t(questions.oilyShine.label)}
                                options={options.oilyShine}
                                register={register}
                            />

                            <TextareaSection
                                description={t(
                                    questions.currentSkills.description || ''
                                )}
                                label={t(questions.currentSkills.label)}
                                register={register('currentSkills')}
                            />

                            <CheckboxSection
                                description={t(
                                    questions.desiredSkills.description || ''
                                )}
                                label={t(questions.desiredSkills.label)}
                                options={options.desiredSkills}
                                register={register}
                            />

                            <RadioButtonSection
                                description={t(
                                    questions.makeupTime.description || ''
                                )}
                                label={t(questions.makeupTime.label)}
                                options={options.makeupTime}
                                register={register}
                            />

                            <RadioButtonSection
                                description={t(
                                    questions.budget.description || ''
                                )}
                                label={t(questions.budget.label)}
                                options={options.budget}
                                register={register}
                            />

                            <RadioButtonSection
                                description={t(
                                    questions.brushes.description || ''
                                )}
                                horizontal={true}
                                label={t(questions.brushes.label)}
                                options={options.brushes}
                                register={register}
                            />

                            <CheckboxSection
                                description={t(
                                    questions.problems.description || ''
                                )}
                                label={t(questions.problems.label)}
                                options={options.problems}
                                register={register}
                            />

                            <RadioButtonSection
                                description={t(
                                    questions.referral.description || ''
                                )}
                                label={t(questions.referral.label)}
                                options={options.referral}
                                register={register}
                            />
                        </article>

                        <section className={buttonStyles.section}>
                            <ButtonSubmit
                                className="sm:w-48"
                                isLoading={isLoading}
                                label={isLoading ? t('sending') : t('send')}
                            />
                        </section>
                    </form>
                </article>
            </main>

            <NavBar />
        </article>
    )
}
