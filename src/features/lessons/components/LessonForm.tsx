import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { TopPanel } from '../../../components/TopPanel'
import { NavBar } from '../../../components/navigation/NavBar'
import { NavButton } from '../../../components/navigation/NavButton'
import { ButtonNavigateSection } from '../../form/components/ButtonNavigateSection'
import { TextareaSection } from '../../form/components/TextareaSection'
import { selectFormData, setFormData } from '../../form/formSlice'
import type { Lesson } from '../types'
import { lessonSchema } from '../validations'

export interface LessonFormProps {
    title: string
    onSubmit: (data: Lesson) => void
}

export const LessonForm = ({ onSubmit, title }: LessonFormProps) => {
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

    const productIds = watch('productIds')

    const productsText = productIds
        ? `${t('fields.products.selected')}: ${productIds.length}`
        : t('fields.products.select')

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
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <section className="title-container hidden sm:block">
                        <h1 className="title-headline">{title}</h1>
                    </section>

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextareaSection
                            error={t(errors.title?.message || '')}
                            label={t('fields.title.label')}
                            register={register('title')}
                            required={true}
                            value={watch('title')}
                        />

                        <TextareaSection
                            error={t(errors.shortDescription?.message || '')}
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
                            error={t(errors.productIds?.message || '')}
                            label={t('fields.products.label')}
                            onNavigate={() => handleNavigate('products')}
                            required={true}
                            text={productsText}
                        />

                        <ButtonNavigateSection
                            label={t('fields.clients.label')}
                            onNavigate={() => handleNavigate('clients')}
                            text={clientsText}
                        />
                    </form>
                </article>
            </main>

            <NavBar>
                <NavButton
                    icon={ArrowLeftIcon}
                    label={t('navigation:actions.back')}
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavButton
                    icon={CheckIcon}
                    label={t('navigation:actions.save')}
                    onClick={handleSubmit(onSubmit)}
                />
            </NavBar>
        </article>
    )
}
