import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { selectFormData } from '@/features/form/slice/formSlice'
import { TitleSection } from '@/shared/components/common/title-section/TitleSection'
import formStyles from '@/shared/components/forms/form.module.css'
import { ImageUrlSection } from '@/shared/components/forms/image/url-section/ImageUrlSection'
import { InputSection } from '@/shared/components/forms/input/section/InputSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import buttonStyles from '@/shared/components/ui/button-submit/ButtonSubmit.module.css'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import type { Stage } from '../../types'
import { stageSchema } from '../../validations'

export interface StageFormProps {
    onSubmit: (data: Stage) => void
    title: string
    isSaving?: boolean
}

export const StageForm = ({
    onSubmit,
    title,
    isSaving = false,
}: StageFormProps) => {
    const navigate = useNavigate()
    const { t } = useTranslation('stage')

    const {
        clearErrors,
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Stage>({
        resolver: yupResolver(stageSchema),
    })

    const formData = useAppSelector(selectFormData) as Stage

    useEffect(() => {
        reset(formData)
    }, [formData])

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <TitleSection title={title} hideOnMobile />

                    <form
                        className={formStyles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
                            <InputSection
                                error={t(errors.title?.message || '')}
                                label={t('fields.title.label')}
                                register={register('title')}
                                required={true}
                                type="text"
                            />

                            <TextareaSection
                                error={t(errors.subtitle?.message || '')}
                                label={t('fields.subtitle.label')}
                                register={register('subtitle')}
                                required={true}
                                value={watch('subtitle')}
                            />

                            <ImageUrlSection
                                clearErrors={clearErrors}
                                folder="stages"
                                error={t(errors.imageUrl?.message || '')}
                                label={t('fields.imageUrl.label')}
                                name="imageUrl"
                                register={register('imageUrl')}
                                required={true}
                                setValue={setValue}
                                value={watch('imageUrl')}
                            />

                            <TextareaSection
                                label={t('fields.comment.label')}
                                register={register('comment')}
                                value={watch('comment')}
                            />

                            <TextareaSection
                                label={t('fields.stepsText.label')}
                                register={register('stepsText')}
                                rows={10}
                                value={watch('stepsText')}
                            />
                        </article>

                        <section className={buttonStyles.section}>
                            <ButtonSubmit
                                className="sm:w-48"
                                isLoading={isSaving}
                                label={
                                    isSaving
                                        ? t('navigation:actions.saving')
                                        : t('navigation:actions.save')
                                }
                            />
                        </section>
                    </form>
                </article>
            </main>
        </article>
    )
}
