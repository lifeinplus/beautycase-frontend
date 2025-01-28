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
    selectFormData,
    setFormData,
    TextareaSection,
    type FieldConfig,
} from '../../form'
import { lessonSchema, type Lesson } from '../../lessons'

interface LessonFormProps {
    onSubmit: (data: Lesson) => void
    title: string
}

const renderField = (
    field: FieldConfig<Lesson>,
    register: UseFormRegister<Lesson>,
    watch: UseFormWatch<Lesson>,
    errors: FieldErrors<Lesson>
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

export const LessonForm = ({ onSubmit, title }: LessonFormProps) => {
    const navigate = useNavigate()

    const formData = useAppSelector(selectFormData) as Lesson

    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Lesson>({
        resolver: yupResolver(lessonSchema),
    })

    useEffect(() => {
        reset(formData)
    }, [formData])

    const fields: FieldConfig<Lesson>[] = [
        {
            label: 'Заголовок',
            name: 'title',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Краткое описание',
            name: 'shortDescription',
            required: true,
            type: 'textarea',
        },
        {
            label: 'Ссылка на видео',
            name: 'videoUrl',
            preview: true,
            required: true,
            type: 'textarea',
        },
        {
            label: 'Полное описание',
            name: 'fullDescription',
            required: true,
            rows: 4,
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
