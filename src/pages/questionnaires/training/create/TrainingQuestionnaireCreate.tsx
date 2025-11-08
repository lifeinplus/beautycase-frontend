import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import config from '@/app/config/config'
import { useCreateTrainingQuestionnaireMutation } from '@/features/questionnaires/api/questionnairesApi'
import { trainingQuestionnaireQuestions } from '@/features/questionnaires/training/questions/trainingQuestionnaireQuestions'
import { trainingQuestionnaireSchema } from '@/features/questionnaires/training/validations/trainingQuestionnaireSchema'
import type { TrainingQuestionnaire } from '@/features/questionnaires/types'

import { SelectOption } from '@/features/form/types'
import { useGetAllMuasQuery } from '@/features/users/api/usersApi'
import { InputSection } from '@/shared/components/forms/input/section/InputSection'
import { RadioButtonSection } from '@/shared/components/forms/radio-button/section/RadioButtonSection'
import { SelectSection } from '@/shared/components/forms/select/section/SelectSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { fullNameWithUsername } from '@/shared/utils/ui/fullNameWithUsername'

export const TrainingQuestionnaireCreate = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('questionnaire')

    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<TrainingQuestionnaire>({
        resolver: yupResolver(trainingQuestionnaireSchema),
    })

    const [createTrainingQuestionnaire, { isLoading }] =
        useCreateTrainingQuestionnaireMutation()

    const { data: muas } = useGetAllMuasQuery()

    const muaOptions: SelectOption[] | undefined = muas?.map((m) => ({
        text: fullNameWithUsername(m.firstName, m.lastName, m.username),
        value: m._id!,
    }))

    const onSubmit = async (data: TrainingQuestionnaire) => {
        try {
            await createTrainingQuestionnaire(data).unwrap()
            reset()
            navigate(ROUTES.confirmation)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleBack = () => {
        navigate(ROUTES.questionnaires.root)
    }

    const title = t('training.hero.headline')
    const subtitle = t('training.hero.byline')

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero
                        title={title}
                        subtitle={subtitle}
                        imgUrl={config.cloudinary.questionnaireTrainingHero}
                        content={t('training.hero.content')}
                        hideOnMobile
                    />

                    <div className="md:hidden">
                        <Hero
                            subtitle={subtitle}
                            imgUrl={config.cloudinary.questionnaireTrainingHero}
                            content={t('training.hero.content')}
                        />
                    </div>

                    <form
                        className="space-y-6"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
                            <p className="text-sm text-rose-500 dark:text-rose-400">
                                {t('requiredField')}
                            </p>

                            <SelectSection
                                error={t(errors.muaId?.message || '')}
                                label={t(
                                    trainingQuestionnaireQuestions.mua.label
                                )}
                                options={muaOptions}
                                register={register('muaId')}
                                required={true}
                                value={watch('muaId')}
                            />

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
                                    trainingQuestionnaireQuestions.experience
                                        .options
                                }
                                register={register('experience')}
                                t={t}
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

                        <section
                            className={classNames(
                                'border-t border-gray-300 px-3 pt-6',
                                'md:flex md:justify-end md:border-0 md:pt-0',
                                'dark:border-gray-700'
                            )}
                        >
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
