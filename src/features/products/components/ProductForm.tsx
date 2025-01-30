import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import {
    FieldError,
    FieldErrors,
    useForm,
    UseFormRegister,
    UseFormWatch,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { useGetBrandsQuery } from '../../brands'
import {
    ButtonNavigateSection,
    InputSection,
    selectFormData,
    SelectSection,
    setFormData,
    TextareaSection,
    type FieldConfig,
} from '../../form'
import { type StoreLink } from '../../stores'
import { productSchema, type Product } from '../../products'

interface ProductFormProps {
    title: string
    onSubmit: (data: Product) => void
}

const renderField = (
    field: FieldConfig<Product>,
    register: UseFormRegister<Product>,
    watch: UseFormWatch<Product>,
    errors: FieldErrors<Product>
) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { label, name, options, path, preview, required, rows, type } = field

    const error = errors[name] as FieldError

    if (type === 'button-navigate') {
        const value = watch(name) as StoreLink[] | undefined
        return (
            <ButtonNavigateSection
                key={name}
                handleNavigate={() => {
                    dispatch(setFormData(watch()))
                    if (path) navigate(path)
                }}
                label={label}
                text={value ? `Добавлено: ${value.length}` : 'Добавить'}
                error={error}
                required={required}
            />
        )
    }

    if (type === 'select') {
        return (
            <SelectSection
                key={name}
                error={error}
                label={label}
                options={options}
                register={register(name)}
                required={required}
                value={watch(name)?.toString()}
            />
        )
    }

    if (type === 'textarea') {
        return (
            <TextareaSection
                key={name}
                label={label}
                register={register(name)}
                error={error}
                preview={preview}
                required={required}
                rows={rows}
                value={watch(name)?.toString()}
            />
        )
    }

    return (
        <InputSection
            key={name}
            error={error}
            label={label}
            register={register(name)}
            required={required}
            type={type}
        />
    )
}

export const ProductForm = ({ title, onSubmit }: ProductFormProps) => {
    const navigate = useNavigate()

    const formData = useAppSelector(selectFormData) as Product
    const { data: brands } = useGetBrandsQuery()

    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Product>({
        resolver: yupResolver(productSchema),
    })

    useEffect(() => {
        reset(formData)
    }, [formData])

    const fields: FieldConfig<Product>[] = [
        {
            label: 'Бренд',
            name: 'brandId',
            options: brands?.map((b) => ({
                text: b.name,
                value: b._id,
            })),
            required: true,
            type: 'select',
        },
        {
            label: 'Название',
            name: 'name',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Ссылка на изображение',
            name: 'imageUrl',
            preview: true,
            required: true,
            type: 'textarea',
        },
        {
            label: 'Оттенок',
            name: 'shade',
            type: 'text',
        },
        {
            label: 'Комментарий',
            name: 'comment',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Ссылки на товар',
            name: 'storeLinks',
            path: '/stores/links/add',
            required: true,
            type: 'button-navigate',
        },
    ]

    const handleBack = () => {
        navigate(-1)
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
                        {fields.map((f) =>
                            renderField(f, register, watch, errors)
                        )}
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
