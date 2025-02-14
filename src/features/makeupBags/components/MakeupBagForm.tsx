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
import { useGetCategoriesQuery } from '../../categories'
import {
    ButtonNavigateSection,
    selectFormData,
    SelectSection,
    setFormData,
    type FieldConfig,
} from '../../form'
import { makeupBagSchema, type MakeupBag } from '../../makeupBags'
import { useGetUsersQuery } from '../../users'

interface MakeupBagFormProps {
    title: string
    onSubmit: (data: MakeupBag) => void
}

const renderField = (
    field: FieldConfig<MakeupBag>,
    register: UseFormRegister<MakeupBag>,
    watch: UseFormWatch<MakeupBag>,
    errors: FieldErrors<MakeupBag>
) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { label, name, options, path, required, type } = field

    const error = errors[name] as FieldError

    if (type === 'button-navigate') {
        const value = watch(name) as string[] | undefined
        return (
            <ButtonNavigateSection
                key={name}
                onNavigate={() => {
                    dispatch(setFormData(watch()))
                    if (path) navigate(path)
                }}
                label={label}
                text={value ? `Выбрано: ${value.length}` : 'Выбрать'}
                error={error}
                required={required}
            />
        )
    }

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

export const MakeupBagForm = ({ onSubmit, title }: MakeupBagFormProps) => {
    const navigate = useNavigate()

    const formData = useAppSelector(selectFormData) as MakeupBag
    const { data: categories } = useGetCategoriesQuery()
    const { data: users } = useGetUsersQuery()

    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<MakeupBag>({
        resolver: yupResolver(makeupBagSchema),
    })

    useEffect(() => {
        reset(formData)
    }, [formData])

    const fields: FieldConfig<MakeupBag>[] = [
        {
            label: 'Категория',
            name: 'categoryId',
            options: categories?.map((c) => ({
                text: c.name,
                value: c._id,
            })),
            required: true,
            type: 'select',
        },
        {
            label: 'Клиент',
            name: 'clientId',
            options: users?.map((u) => ({
                text: u.username,
                value: u._id,
            })),
            required: true,
            type: 'select',
        },
        {
            label: 'Этапы',
            name: 'stageIds',
            path: '/stages/selection',
            required: true,
            type: 'button-navigate',
        },
        {
            label: 'Инструменты',
            name: 'toolIds',
            path: '/tools/selection',
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
