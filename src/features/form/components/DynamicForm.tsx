import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar } from '../../../components/AdaptiveNavBar'
import { TopPanel } from '../../../components/TopPanel'
import { getYouTubeThumbnail } from '../../../utils'
import { selectFormData, setFormData } from '../formSlice'
import type { FieldConfig } from '../types'

interface DynamicFormProps<T> {
    title: string
    fields: FieldConfig<T>[]
    onSubmit: (data: T) => void
}

const generateButtonText = (value: string[]) =>
    value?.length ? `Выбрано: ${value.length}` : 'Выбрать продукты'

const renderYouTubeThumbnail = (url: string) => (
    <div className="form-thumbnail-container">
        <img
            src={getYouTubeThumbnail(url)}
            alt="Video Thumbnail"
            className="form-thumbnail-image"
        />
    </div>
)

const renderField = <T extends Record<string, any>>(
    field: FieldConfig<T>,
    value: any,
    handleChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
) => {
    const { label, name, onClick, required, rows, type } = field

    if (type === 'textarea') {
        return (
            <label key={name as string} className="block">
                <span className="form-label">{label}</span>
                <textarea
                    className="form-input"
                    name={name as string}
                    onChange={handleChange}
                    placeholder={label}
                    required={required}
                    rows={rows}
                    value={value}
                />
            </label>
        )
    }

    if (type === 'button') {
        return (
            <div key={name as string}>
                <label className="block">
                    <span className="form-label">{label}</span>
                </label>
                <button
                    type="button"
                    onClick={onClick}
                    className="form-button-select"
                >
                    <span>{generateButtonText(value)}</span>
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
        )
    }

    return (
        <label key={name as string} className="block">
            <span className="form-label">{label}</span>
            <input
                className="form-input peer"
                name={name as string}
                onChange={handleChange}
                placeholder={label}
                required={required}
                type={type}
                value={value}
            />
            {name === 'videoUrl' && value && renderYouTubeThumbnail(value)}
        </label>
    )
}

export const DynamicForm = <T extends Record<string, any>>({
    title,
    fields,
    onSubmit,
}: DynamicFormProps<T>) => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData) as T

    const handleBack = () => {
        navigate(-1)
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        dispatch(setFormData({ [name]: value }))
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
                        {fields.map((field) => {
                            const { name } = field
                            const value = formData[name] || ''
                            return renderField(field, value, handleChange)
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
