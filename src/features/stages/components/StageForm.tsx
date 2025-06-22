import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { TopPanel } from '../../../components/TopPanel'
import { ButtonNavigateSection } from '../../form/components/ButtonNavigateSection'
import { InputSection } from '../../form/components/InputSection'
import { ImageUrlSection } from '../../form/components/ImageUrlSection'
import { TextareaSection } from '../../form/components/TextareaSection'
import { selectFormData, setFormData } from '../../form/formSlice'
import type { Stage } from '../types'
import { stageSchema } from '../validations'

export interface StageFormProps {
    onSubmit: (data: Stage) => void
    title: string
}

export const StageForm = ({ onSubmit, title }: StageFormProps) => {
    const navigate = useNavigate()

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
        ? `Выбрано: ${productIds.length}`
        : 'Выбрать'

    const handleBack = () => {
        navigate(-1)
    }

    const handleNavigate = () => {
        dispatch(setFormData(watch()))
        navigate('/products/selection')
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
                            error={errors.title?.message}
                            label="Заголовок"
                            register={register('title')}
                            required={true}
                            type="text"
                        />

                        <TextareaSection
                            error={errors.subtitle?.message}
                            label="Подзаголовок"
                            register={register('subtitle')}
                            required={true}
                            value={watch('subtitle')}
                        />

                        <ImageUrlSection
                            clearErrors={clearErrors}
                            folder="stages"
                            error={errors.imageUrl}
                            label="Ссылка на изображение"
                            name="imageUrl"
                            register={register('imageUrl')}
                            required={true}
                            setValue={setValue}
                            value={watch('imageUrl')}
                        />

                        <TextareaSection
                            label={'Комментарий'}
                            register={register('comment')}
                            value={watch('comment')}
                        />

                        <TextareaSection
                            label="Шаги"
                            register={register('stepsText')}
                            rows={10}
                            value={watch('stepsText')}
                        />

                        <ButtonNavigateSection
                            error={errors.productIds?.message}
                            label="Продукты"
                            onNavigate={handleNavigate}
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
