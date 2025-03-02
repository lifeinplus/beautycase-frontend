import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { type FieldError, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import {
    ButtonNavigateSection,
    selectFormData,
    setFormData,
    TextareaSection,
} from '../../form'
import { lessonSchema, type Lesson } from '../../lessons'

interface LessonFormProps {
    title: string
    onSubmit: (data: Lesson) => void
}

export const LessonForm = ({ onSubmit, title }: LessonFormProps) => {
    const navigate = useNavigate()

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
        ? `Выбрано: ${productIds.length}`
        : 'Выбрать'

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
                            error={errors.title}
                            label="Заголовок"
                            register={register('title')}
                            required={true}
                            value={watch('title')}
                        />

                        <TextareaSection
                            error={errors.shortDescription}
                            label="Краткое описание"
                            register={register('shortDescription')}
                            required={true}
                            value={watch('shortDescription')}
                        />

                        <TextareaSection
                            error={errors.videoUrl}
                            label="Ссылка на видео"
                            preview={true}
                            register={register('videoUrl')}
                            required={true}
                            value={watch('videoUrl')}
                        />

                        <TextareaSection
                            error={errors.fullDescription}
                            label="Полное описание"
                            register={register('fullDescription')}
                            required={true}
                            rows={4}
                            value={watch('fullDescription')}
                        />

                        <ButtonNavigateSection
                            error={errors.productIds as FieldError}
                            label="Продукты"
                            onNavigate={() =>
                                handleNavigate('/products/selection')
                            }
                            required={true}
                            text={productsText}
                        />
                    </form>
                </article>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text="Назад"
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavigationButton
                    icon={<CheckIcon className="h-6 w-6" />}
                    text="Сохранить"
                    onClick={handleSubmit(onSubmit)}
                />
            </AdaptiveNavBar>
        </article>
    )
}
