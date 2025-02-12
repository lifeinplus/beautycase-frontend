import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { useGetBrandsQuery } from '../../brands'
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
import { type StoreLink } from '../../stores'

interface ProductFormProps {
    title: string
    onSubmit: (data: Product) => void
}

export const ProductForm = ({ title, onSubmit }: ProductFormProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const formData = useAppSelector(selectFormData) as Product
    const { data: brands } = useGetBrandsQuery()

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

    useEffect(() => {
        reset(formData)
    }, [formData])

    const handleBack = () => {
        navigate(-1)
    }

    const storeLinks = watch('storeLinks') as StoreLink[] | undefined

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
                            options={brands?.map((b) => ({
                                text: b.name,
                                value: b._id,
                            }))}
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
                            handleNavigate={() => {
                                dispatch(setFormData(watch()))
                                navigate('/stores/links/add')
                            }}
                            label={'Ссылки на товар'}
                            required={true}
                            text={
                                storeLinks
                                    ? `Добавлено: ${storeLinks.length}`
                                    : 'Добавить'
                            }
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
