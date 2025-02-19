import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { useReadBrandsQuery } from '../../brands'
import {
    ButtonNavigateSection,
    ImageUrlSection,
    InputSection,
    selectFormData,
    SelectSection,
    setFormData,
    TextareaSection,
} from '../../form'
import { productSchema, type Product } from '../../products'

interface ProductFormProps {
    title: string
    onSubmit: (data: Product) => void
}

export const ProductForm = ({ title, onSubmit }: ProductFormProps) => {
    const navigate = useNavigate()

    const {
        clearErrors,
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Product>({
        resolver: yupResolver(productSchema),
    })

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData) as Product

    useEffect(() => {
        reset(formData)
    }, [formData])

    const { data: brands } = useReadBrandsQuery()

    const brandOptions = brands?.map((b) => ({
        text: b.name,
        value: b._id,
    }))

    const storeLinks = watch('storeLinks')

    const linksText = storeLinks
        ? `Добавлено: ${storeLinks.length}`
        : 'Добавить'

    const handleBack = () => {
        navigate(-1)
    }

    const handleNavigate = () => {
        dispatch(setFormData(watch()))
        navigate('/stores/links/add')
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
                        <SelectSection
                            error={errors.brandId}
                            label={'Бренд'}
                            options={brandOptions}
                            register={register('brandId')}
                            required={true}
                            value={watch('brandId')}
                        />

                        <TextareaSection
                            error={errors.name}
                            label={'Название'}
                            register={register('name')}
                            required={true}
                            value={watch('name')}
                        />

                        <ImageUrlSection
                            clearErrors={clearErrors}
                            folder="products"
                            error={errors.imageUrl}
                            label={'Ссылка на изображение'}
                            name={'imageUrl'}
                            register={register('imageUrl')}
                            required={true}
                            setValue={setValue}
                            value={watch('imageUrl')}
                        />

                        <InputSection
                            error={errors.shade}
                            label={'Оттенок'}
                            register={register('shade')}
                            type={'text'}
                        />

                        <TextareaSection
                            error={errors.comment}
                            label={'Комментарий'}
                            register={register('comment')}
                            required={true}
                            value={watch('comment')}
                        />

                        <ButtonNavigateSection
                            error={errors.storeLinks as FieldError}
                            label={'Ссылки на продукт'}
                            onNavigate={handleNavigate}
                            required={true}
                            text={linksText}
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
