import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar } from './AdaptiveNavBar'
import { TopPanel } from './TopPanel'

export interface FieldConfig<T> {
    name: keyof T
    label: string
    required?: boolean
}

interface DynamicFormProps<T> {
    initialData: T
    fields: FieldConfig<T>[]
    onSubmit: (data: T) => void
    title: string
}

export const DynamicForm = <T extends Record<string, any>>({
    initialData,
    fields,
    onSubmit,
    title,
}: DynamicFormProps<T>) => {
    const [formData, setFormData] = useState<T>(initialData)
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={() => navigate(-1)} />

            <main className="page-content">
                <article className="mx-auto max-w-makeup-item-md xl:max-w-makeup-item-xl">
                    <section className="page-content__title hidden sm:block">
                        <h1 className="page-content__title__headline">
                            {title}
                        </h1>
                    </section>

                    <form onSubmit={handleSubmit} className="form">
                        {fields.map((field) => (
                            <label key={field.name as string} className="block">
                                <span className="form__label">
                                    {field.label}
                                </span>
                                <input
                                    name={field.name as string}
                                    className="form__input"
                                    placeholder={field.label}
                                    type="text"
                                    required={field.required}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                />
                            </label>
                        ))}
                    </form>
                </article>
            </main>

            <AdaptiveNavBar>
                <button
                    className="nav-btn nav-btn-back"
                    onClick={() => navigate(-1)}
                >
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
