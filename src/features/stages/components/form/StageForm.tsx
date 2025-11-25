import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { selectFormData } from '@/features/form/slice/formSlice'
import { ImageFileSection } from '@/shared/components/forms/image/file-section/ImageFileSection'
import { InputSection } from '@/shared/components/forms/input/section/InputSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
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

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <TitleSection title={title} hideOnMobile />

                    <form
                        className="space-y-6"
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

                            <ImageFileSection
                                clearErrors={clearErrors}
                                folder="stages"
                                error={t(errors.imageId?.message || '')}
                                label={t('fields.imageId.label')}
                                name="imageId"
                                required={true}
                                setValue={setValue}
                                value={watch('imageId')}
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

                        <section
                            className={classNames(
                                'border-t border-gray-300 px-3 pt-6',
                                'md:flex md:justify-end md:border-0 md:pt-0',
                                'dark:border-gray-700'
                            )}
                        >
                            <ButtonSubmit
                                isLoading={isSaving}
                                label={
                                    isSaving
                                        ? t('actions:saving')
                                        : t('actions:save')
                                }
                            />
                        </section>
                    </form>
                </article>
            </main>
        </article>
    )
}
