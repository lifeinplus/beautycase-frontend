import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectFormData, setFormData } from '@/features/form/formSlice'
import { TitleSection } from '@/shared/components/common/TitleSection'
import { ButtonNavigateSection } from '@/shared/components/forms/ButtonNavigateSection'
import formStyles from '@/shared/components/forms/form.module.css'
import { TextareaSection } from '@/shared/components/forms/TextareaSection'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import buttonStyles from '@/shared/components/ui/button.module.css'
import { ButtonSubmit } from '@/shared/components/ui/ButtonSubmit'
import pageStyles from '@/shared/components/ui/page.module.css'
import type { Lesson } from '../types'
import { lessonSchema } from '../validations'

export interface LessonFormProps {
    title: string
    onSubmit: (data: Lesson) => void
    isSaving?: boolean
}

export const LessonForm = ({
    onSubmit,
    title,
    isSaving = false,
}: LessonFormProps) => {
    const navigate = useNavigate()
    const { t } = useTranslation('lesson')

    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Lesson>({
        resolver: yupResolver(lessonSchema),
    })

    const dispatch = useAppDispatch()
    const formData: Lesson = useAppSelector(selectFormData)

    useEffect(() => {
        reset(formData)
    }, [formData])

    const clientIds = watch('clientIds')

    const clientsText = clientIds
        ? `${t('fields.clients.selected')}: ${clientIds.length}`
        : t('fields.clients.select')

    const handleBack = () => {
        navigate(-1)
    }

    const handleNavigate = (path: string) => {
        dispatch(setFormData(watch()))
        navigate(path)
    }

    return (
        <article className={pageStyles.page}>
            <TopPanel title={title} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <TitleSection title={title} hideOnMobile />

                    <form
                        className={formStyles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
                            <TextareaSection
                                error={t(errors.title?.message || '')}
                                label={t('fields.title.label')}
                                register={register('title')}
                                required={true}
                                value={watch('title')}
                            />

                            <TextareaSection
                                error={t(
                                    errors.shortDescription?.message || ''
                                )}
                                label={t('fields.shortDescription.label')}
                                register={register('shortDescription')}
                                required={true}
                                value={watch('shortDescription')}
                            />

                            <TextareaSection
                                error={t(errors.videoUrl?.message || '')}
                                label={t('fields.videoUrl.label')}
                                preview={true}
                                register={register('videoUrl')}
                                required={true}
                                value={watch('videoUrl')}
                            />

                            <TextareaSection
                                error={t(errors.fullDescription?.message || '')}
                                label={t('fields.fullDescription.label')}
                                register={register('fullDescription')}
                                required={true}
                                rows={4}
                                value={watch('fullDescription')}
                            />

                            <ButtonNavigateSection
                                label={t('fields.clients.label')}
                                onNavigate={() => handleNavigate('clients')}
                                text={clientsText}
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
