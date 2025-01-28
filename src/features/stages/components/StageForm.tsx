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
import {
    ButtonNavigateSection,
    InputSection,
    selectFormData,
    setFormData,
    TextareaSection,
    type FieldConfig,
} from '../../form'
import { stageSchema, type Stage } from '../../stages'

interface StageFormProps {
    onSubmit: (data: Stage) => void
    title: string
}

const renderField = (
    field: FieldConfig<Stage>,
    register: UseFormRegister<Stage>,
    watch: UseFormWatch<Stage>,
    errors: FieldErrors<Stage>
) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { label, name, path, preview, required, rows, type } = field

    const error = errors[name] as FieldError

    if (type === 'button-navigate') {
        const value = watch(name) as string[] | undefined
        return (
            <ButtonNavigateSection
                key={name}
                handleNavigate={() => {
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

export const StageForm = ({ onSubmit, title }: StageFormProps) => {
    const navigate = useNavigate()

    const formData = useAppSelector(selectFormData) as Stage

    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Stage>({
        resolver: yupResolver(stageSchema),
    })

    useEffect(() => {
        reset(formData)
    }, [formData])

    const fields: FieldConfig<Stage>[] = [
        {
            label: 'Заголовок',
            name: 'title',
            required: true,
            type: 'text',
        },
        {
            label: 'Подзаголовок',
            name: 'subtitle',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Ссылка на изображение',
            name: 'image',
            preview: true,
            required: true,
            type: 'textarea',
        },
        {
            label: 'Шаги',
            name: 'stepsText',
            required: true,
            rows: 10,
            type: 'textarea',
        },
        {
            label: 'Продукты',
            name: 'selectedProductIds',
            path: '/products/selection',
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
