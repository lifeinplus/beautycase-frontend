import { CheckIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import type { Tool } from '../types'

interface ToolFormProps {
    initialData?: Tool
    onSubmit: (tool: Tool) => void
    title: string
}

const ToolForm = ({
    initialData = { name: '', image: '', number: '', comment: '' },
    onSubmit,
    title,
}: ToolFormProps) => {
    const [formData, setFormData] = useState<Tool>(initialData)
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
        <article className="page-container">
            <TopPanel title={title} onBack={() => navigate(-1)} />

            <main className="page-content">
                <article className="max-w-makeup-item-md xl:max-w-makeup-item-xl mx-auto">
                    <section className="page-content__title hidden sm:block">
                        <h1 className="page-content__title__text">{title}</h1>
                    </section>

                    <form onSubmit={handleSubmit} className="form">
                        <label className="block">
                            <span className="form__label">Название</span>
                            <input
                                name="name"
                                className="form__input"
                                onChange={handleChange}
                                placeholder="Название"
                                required
                                type="text"
                                value={formData.name}
                            />
                        </label>

                        <label className="block">
                            <span className="form__label">URL изображения</span>
                            <input
                                className="form__input"
                                name="image"
                                onChange={handleChange}
                                placeholder="URL изображения"
                                required
                                type="text"
                                value={formData.image}
                            />
                        </label>

                        <label className="block">
                            <span className="form__label">Номер</span>
                            <input
                                className="form__input"
                                name="number"
                                onChange={handleChange}
                                placeholder="Номер"
                                required
                                type="text"
                                value={formData.number}
                            />
                        </label>

                        <label className="block">
                            <span className="form__label">Комментарий</span>
                            <input
                                className="form__input"
                                name="comment"
                                onChange={handleChange}
                                placeholder="Комментарий"
                                required
                                type="text"
                                value={formData.comment}
                            />
                        </label>
                    </form>
                </article>
            </main>

            <AdaptiveNavBar>
                <button
                    className="adaptive-nav-bar__button--action"
                    onClick={handleSubmit}
                >
                    <CheckIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Сохранить</span>
                </button>
            </AdaptiveNavBar>
        </article>
    )
}

export default ToolForm
