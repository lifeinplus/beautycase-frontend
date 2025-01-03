import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { getYouTubeThumbnail } from '../../../utils'
import { selectFormData, setFormData } from '../formSlice'
import type { FieldConfig } from '../types'
import { Label } from './Label'

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
            <Label key={name as string} text={label}>
                <textarea
                    className="form-input"
                    name={name as string}
                    onChange={handleChange}
                    placeholder={label}
                    required={required}
                    rows={rows}
                    value={value}
                />
            </Label>
        )
    }

    if (type === 'button') {
        return (
            <div key={name as string}>
                <Label text={label} />
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
        <Label key={name as string} text={label}>
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
        </Label>
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
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container page-content__container-xl">
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
                </section>
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
                    onClick={handleSubmit}
                />
            </AdaptiveNavBar>
        </article>
    )
}
