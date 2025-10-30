import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import config from '@/app/config/config'
import { useCreateMakeupBagQuestionnaireMutation } from '@/features/questionnaires/api/questionnairesApi'
import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import { makeupBagQuestionnaireSchema } from '@/features/questionnaires/makeup-bag/validations/makeupBagQuestionnaireSchema'
import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import { CheckboxSection } from '@/shared/components/forms/checkbox/section/CheckboxSection'
import { ImageTextSection } from '@/shared/components/forms/image/text-section/ImageTextSection'
import { InputSection } from '@/shared/components/forms/input/section/InputSection'
import { RadioButtonSection } from '@/shared/components/forms/radio-button/section/RadioButtonSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const MakeupBagQuestionnaireCreate = () => {
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
    } = useForm<MakeupBagQuestionnaire>({
        resolver: yupResolver(makeupBagQuestionnaireSchema),
    })

    const [createMakeupBagQuestionnaire, { isLoading }] =
        useCreateMakeupBagQuestionnaireMutation()

    const onSubmit = async (data: MakeupBagQuestionnaire) => {
        try {
            await createMakeupBagQuestionnaire(data).unwrap()
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

    const title = t('makeupBag.hero.headline')
    const subtitle = t('makeupBag.hero.byline')

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero
                        title={title}
                        subtitle={subtitle}
                        imgUrl={config.cloudinary.questionnaireMakeupBagHero}
                        content={t('makeupBag.hero.content')}
                        hideOnMobile
                    />

                    <div className="sm:hidden">
                        <Hero
                            subtitle={subtitle}
                            imgUrl={
                                config.cloudinary.questionnaireMakeupBagHero
                            }
                            content={t('makeupBag.hero.content')}
                        />
                    </div>

                    <form
                        className="space-y-6"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
                            <p
                                className={classNames(
                                    'text-rose-500 dark:text-rose-400',
                                    'text-sm'
                                )}
                            >
                                {t('requiredField')}
                            </p>

                            <InputSection
                                error={t(errors.name?.message || '')}
                                label={t(
                                    makeupBagQuestionnaireQuestions.name.label
                                )}
                                register={register('name')}
                                required={true}
                                type="text"
                            />

                            <InputSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.instagram
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.instagram
                                        .label
                                )}
                                register={register('instagram')}
                                type="text"
                            />

                            <InputSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.city
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.city.label
                                )}
                                register={register('city')}
                                type="text"
                            />

                            <InputSection
                                label={t(
                                    makeupBagQuestionnaireQuestions.age.label
                                )}
                                register={register('age')}
                                type="number"
                            />

                            <ImageTextSection
                                clearErrors={clearErrors}
                                description={t(
                                    makeupBagQuestionnaireQuestions.makeupBag
                                        .description || ''
                                )}
                                folder="questionnaires"
                                error={t(errors.makeupBag?.message || '')}
                                label={t(
                                    makeupBagQuestionnaireQuestions.makeupBag
                                        .label
                                )}
                                labelUrl={t(
                                    makeupBagQuestionnaireQuestions
                                        .makeupBagPhotoUrl.label
                                )}
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
                                    makeupBagQuestionnaireQuestions.procedures
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.procedures
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.procedures
                                        .options
                                }
                                register={register}
                            />

                            <RadioButtonSection
                                label={t(
                                    makeupBagQuestionnaireQuestions.skinType
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.skinType
                                        .options
                                }
                                register={register('skinType')}
                                t={t}
                            />

                            <TextareaSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.allergies
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.allergies
                                        .label
                                )}
                                register={register('allergies')}
                            />

                            <RadioButtonSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.peeling
                                        .description || ''
                                )}
                                horizontal={true}
                                label={t(
                                    makeupBagQuestionnaireQuestions.peeling
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.peeling
                                        .options
                                }
                                register={register('peeling')}
                                t={t}
                            />

                            <RadioButtonSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.pores
                                        .description || ''
                                )}
                                horizontal={true}
                                label={t(
                                    makeupBagQuestionnaireQuestions.pores.label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.pores
                                        .options
                                }
                                register={register('pores')}
                                t={t}
                            />

                            <RadioButtonSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.oilyShine
                                        .description || ''
                                )}
                                horizontal={true}
                                label={t(
                                    makeupBagQuestionnaireQuestions.oilyShine
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.oilyShine
                                        .options
                                }
                                register={register('oilyShine')}
                                t={t}
                            />

                            <TextareaSection
                                description={t(
                                    makeupBagQuestionnaireQuestions
                                        .currentSkills.description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions
                                        .currentSkills.label
                                )}
                                register={register('currentSkills')}
                            />

                            <CheckboxSection
                                description={t(
                                    makeupBagQuestionnaireQuestions
                                        .desiredSkills.description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions
                                        .desiredSkills.label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions
                                        .desiredSkills.options
                                }
                                register={register}
                            />

                            <RadioButtonSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.makeupTime
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.makeupTime
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.makeupTime
                                        .options
                                }
                                register={register('makeupTime')}
                                t={t}
                            />

                            <RadioButtonSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.budget
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.budget.label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.budget
                                        .options
                                }
                                register={register('budget')}
                                t={t}
                            />

                            <RadioButtonSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.brushes
                                        .description || ''
                                )}
                                horizontal={true}
                                label={t(
                                    makeupBagQuestionnaireQuestions.brushes
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.brushes
                                        .options
                                }
                                register={register('brushes')}
                                t={t}
                            />

                            <CheckboxSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.problems
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.problems
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.problems
                                        .options
                                }
                                register={register}
                            />

                            <RadioButtonSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.referral
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.referral
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireQuestions.referral
                                        .options
                                }
                                register={register('referral')}
                                t={t}
                            />
                        </article>

                        <section
                            className={classNames(
                                'border-t border-gray-300 px-3 pt-6',
                                'sm:flex sm:justify-end sm:border-0 sm:pt-0',
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
