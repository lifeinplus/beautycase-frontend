import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar } from '../../../components/AdaptiveNavBar'
import { TopPanel } from '../../../components/TopPanel'
import { selectFormData, setFormData } from '../formSlice'

export interface FieldConfig<T> {
    name: keyof T
    label: string
    type: 'text' | 'button'
    required?: boolean
    onClick?: () => void
}

interface DynamicFormProps<T> {
    title: string
    fields: FieldConfig<T>[]
    onSubmit: (data: T) => void
}

export const DynamicForm = <T extends Record<string, any>>({
    title,
    fields,
    onSubmit,
}: DynamicFormProps<T>) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData)

    const handleBack = () => {
        navigate(-1)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(setFormData({ ...formData, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={handleBack} />

            <main className="page-content">
                <article className="mx-auto max-w-makeup-item-md xl:max-w-makeup-item-xl">
                    <section className="page-content__title hidden sm:block">
                        <h1 className="page-content__title__headline">
                            {title}
                        </h1>
                    </section>

                    <form onSubmit={handleSubmit} className="form">
                        {fields.map((field, index) => {
                            const { label, name, type, onClick, required } =
                                field

                            const value = formData[name] || ''

                            if (type === 'button') {
                                const text = value?.length
                                    ? `Выбрано: ${value?.length}`
                                    : 'Выбрать продукты'

                                return (
                                    <div key={name as string}>
                                        <label
                                            key={name as string}
                                            className="block"
                                        >
                                            <span className="form__label">
                                                {label}
                                            </span>
                                        </label>
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={onClick}
                                            className="form__button--select"
                                        >
                                            <span>{text}</span>
                                            <ChevronRightIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                )
                            }

                            return (
                                <label key={name as string} className="block">
                                    <span className="form__label">{label}</span>
                                    <input
                                        name={name as string}
                                        className="form__input"
                                        placeholder={label}
                                        type={type}
                                        required={required}
                                        value={value}
                                        onChange={handleChange}
                                    />
                                </label>
                            )
                        })}
                    </form>
                </article>
            </main>

            <AdaptiveNavBar>
                <button className="nav-btn nav-btn-back" onClick={handleBack}>
                    <ArrowLeftIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Назад</span>
                </button>
                <button className="nav-btn" onClick={handleSubmit}>
                    <CheckIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Сохранить</span>
                </button>
            </AdaptiveNavBar>
        </article>
    )
}
