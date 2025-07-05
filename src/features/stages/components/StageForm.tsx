import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { ButtonNavigateSection } from '../../../shared/components/forms/ButtonNavigateSection'
import { ImageUrlSection } from '../../../shared/components/forms/ImageUrlSection'
import { InputSection } from '../../../shared/components/forms/InputSection'
import { TextareaSection } from '../../../shared/components/forms/TextareaSection'
import { NavBar } from '../../../shared/components/navigation/NavBar'
import { NavButton } from '../../../shared/components/navigation/NavButton'
import { TopPanel } from '../../../shared/components/layout/TopPanel'
import { selectFormData, setFormData } from '../../form/formSlice'
import type { Stage } from '../types'
import { stageSchema } from '../validations'

export interface StageFormProps {
    onSubmit: (data: Stage) => void
    title: string
}

export const StageForm = ({ onSubmit, title }: StageFormProps) => {
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

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData) as Stage

    useEffect(() => {
        reset(formData)
    }, [formData])

    const productIds = watch('productIds')

    const productsText = productIds
        ? `${t('fields.products.selected')}: ${productIds.length}`
        : t('fields.products.select')

    const handleBack = () => {
        navigate(-1)
    }

    const handleNavigate = () => {
        dispatch(setFormData(watch()))
        navigate('products')
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

                        <ButtonNavigateSection
                            error={t(errors.productIds?.message || '')}
                            label={t('fields.products.label')}
                            onNavigate={handleNavigate}
                            required={true}
                            text={productsText}
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
