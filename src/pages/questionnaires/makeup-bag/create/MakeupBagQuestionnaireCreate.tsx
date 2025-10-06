import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import config from '@/app/config/config'
import { useCreateMakeupBagQuestionnaireMutation } from '@/features/questionnaires/api/questionnairesApi'
import { makeupBagQuestionnaireOptions } from '@/features/questionnaires/makeup-bag/options/makeupBagQuestionnaireOptions'
import { makeupBagQuestionnaireQuestions } from '@/features/questionnaires/makeup-bag/questions/makeupBagQuestionnaireQuestions'
import { makeupBagQuestionnaireSchema } from '@/features/questionnaires/makeup-bag/validations/makeupBagQuestionnaireSchema'
import type { MakeupBagQuestionnaire } from '@/features/questionnaires/types'
import commonStyles from '@/shared/components/common/common.module.css'
import { Hero } from '@/shared/components/common/hero/Hero'
import { CheckboxSection } from '@/shared/components/forms/checkbox/section/CheckboxSection'
import formStyles from '@/shared/components/forms/form.module.css'
import { ImageTextSection } from '@/shared/components/forms/image/text-section/ImageTextSection'
import { InputSection } from '@/shared/components/forms/input/section/InputSection'
import { RadioButtonSection } from '@/shared/components/forms/radio-button/section/RadioButtonSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import buttonSubmitStyles from '@/shared/components/ui/button-submit/ButtonSubmit.module.css'
import pageStyles from '@/shared/components/ui/page/page.module.css'
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
            navigate('/confirmation')
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleBack = () => {
        navigate('/questionnaires')
    }

    const title = t('makeupBag.hero.headline')
    const subtitle = t('makeupBag.hero.byline')

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero
                        headline={title}
                        byline={subtitle}
                        imgUrl={config.cloudinary.questionnaireMakeupBagHero}
                        content={t('makeupBag.hero.content')}
                        hideOnMobile
                    />

                    <div className="sm:hidden">
                        <Hero
                            byline={subtitle}
                            imgUrl={
                                config.cloudinary.questionnaireMakeupBagHero
                            }
                            content={t('makeupBag.hero.content')}
                        />
                    </div>

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
                                    makeupBagQuestionnaireOptions.procedures
                                }
                                register={register}
                            />

                            <RadioButtonSection
                                label={t(
                                    makeupBagQuestionnaireQuestions.skinType
                                        .label
                                )}
                                options={
                                    makeupBagQuestionnaireOptions.skinTypes
                                }
                                register={register('skinType')}
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
                                options={makeupBagQuestionnaireOptions.peeling}
                                register={register('peeling')}
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
                                options={makeupBagQuestionnaireOptions.pores}
                                register={register('pores')}
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
                                    makeupBagQuestionnaireOptions.oilyShine
                                }
                                register={register('oilyShine')}
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
                                    makeupBagQuestionnaireOptions.desiredSkills
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
                                    makeupBagQuestionnaireOptions.makeupTime
                                }
                                register={register('makeupTime')}
                            />

                            <RadioButtonSection
                                description={t(
                                    makeupBagQuestionnaireQuestions.budget
                                        .description || ''
                                )}
                                label={t(
                                    makeupBagQuestionnaireQuestions.budget.label
                                )}
                                options={makeupBagQuestionnaireOptions.budget}
                                register={register('budget')}
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
                                options={makeupBagQuestionnaireOptions.brushes}
                                register={register('brushes')}
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
                                options={makeupBagQuestionnaireOptions.problems}
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
                                options={makeupBagQuestionnaireOptions.referral}
                                register={register('referral')}
                            />
                        </article>

                        <section className={buttonSubmitStyles.section}>
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
