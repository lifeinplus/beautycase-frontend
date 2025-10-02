import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import config from '@/app/config/config'
import { useCreateTrainingQuestionnaireMutation } from '@/features/questionnaires/api/questionnairesApi'
import { trainingQuestionnaireOptions } from '@/features/questionnaires/training/options/trainingQuestionnaireOptions'
import { trainingQuestionnaireQuestions } from '@/features/questionnaires/training/questions/trainingQuestionnaireQuestions'
import { trainingQuestionnaireSchema } from '@/features/questionnaires/training/validations/trainingQuestionnaireSchema'
import type { TrainingQuestionnaire } from '@/features/questionnaires/types'
import commonStyles from '@/shared/components/common/common.module.css'
import { Hero } from '@/shared/components/common/hero/Hero'
import formStyles from '@/shared/components/forms/form.module.css'
import { InputSection } from '@/shared/components/forms/input/section/InputSection'
import { RadioButtonSection } from '@/shared/components/forms/radio-button/section/RadioButtonSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { Header } from '@/shared/components/layout/header/Header'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import buttonStyles from '@/shared/components/ui/button-submit/ButtonSubmit.module.css'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const TrainingCreate = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('questionnaire')

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<TrainingQuestionnaire>({
        resolver: yupResolver(trainingQuestionnaireSchema),
    })

    const [createTrainingQuestionnaire, { isLoading }] =
        useCreateTrainingQuestionnaireMutation()

    const onSubmit = async (data: TrainingQuestionnaire) => {
        try {
            await createTrainingQuestionnaire(data).unwrap()
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
                        headline={t('training.hero.headline')}
                        byline={t('training.hero.byline')}
                        imgUrl={config.cloudinary.questionnaireTrainingHero}
                        content={t('training.hero.content')}
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
                                description={t(
                                    trainingQuestionnaireQuestions.name
                                        .description || ''
                                )}
                                label={t(
                                    trainingQuestionnaireQuestions.name.label
                                )}
                                register={register('name')}
                                required={true}
                                type="text"
                            />

                            <InputSection
                                error={t(errors.contact?.message || '')}
                                description={t(
                                    trainingQuestionnaireQuestions.contact
                                        .description || ''
                                )}
                                label={t(
                                    trainingQuestionnaireQuestions.contact.label
                                )}
                                register={register('contact')}
                                required={true}
                                type="text"
                            />

                            <RadioButtonSection
                                label={t(
                                    trainingQuestionnaireQuestions.experience
                                        .label
                                )}
                                options={
                                    trainingQuestionnaireOptions.experience
                                }
                                register={register('experience')}
                            />

                            <TextareaSection
                                description={t(
                                    trainingQuestionnaireQuestions.difficulties
                                        .description || ''
                                )}
                                label={t(
                                    trainingQuestionnaireQuestions.difficulties
                                        .label
                                )}
                                register={register('difficulties')}
                                rows={3}
                            />

                            <TextareaSection
                                error={t(errors.expectations?.message || '')}
                                description={t(
                                    trainingQuestionnaireQuestions.expectations
                                        .description || ''
                                )}
                                label={t(
                                    trainingQuestionnaireQuestions.expectations
                                        .label
                                )}
                                register={register('expectations')}
                                required={true}
                                rows={3}
                            />
                        </article>

                        <section className={buttonStyles.section}>
                            <ButtonSubmit
                                isLoading={isLoading}
                                label={isLoading ? t('sending') : t('send')}
                            />
                        </section>
                    </form>
                </article>
            </main>
        </article>
    )
}
