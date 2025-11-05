import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { selectFormData, setFormData } from '@/features/form/slice/formSlice'
import { ButtonNavigateSection } from '@/shared/components/forms/button-navigate/section/ButtonNavigateSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import { ROUTES } from '@/shared/config/routes'
import type { Lesson } from '../../types'
import { lessonSchema } from '../../validations'

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
    const { id } = useParams()
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
        const path = id
            ? ROUTES.backstage.lessons.details(id)
            : ROUTES.backstage.lessons.root
        navigate(path)
    }

    const handleNavigate = (path: string) => {
        dispatch(setFormData(watch()))
        navigate(path)
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
