import { CheckIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import type { Product } from '../types'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface ProductFormProps {
    initialData?: Product
    onSubmit: (product: Product) => void
    title: string
}

const ProductForm = ({
    initialData = { name: '', image: '', buy: '' },
    onSubmit,
    title,
}: ProductFormProps) => {
    const [formData, setFormData] = useState<Product>(initialData)
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
                <article className="mx-auto max-w-makeup-item-md xl:max-w-makeup-item-xl">
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
                            <span className="form__label">Где купить</span>
                            <input
                                className="form__input"
                                name="buy"
                                onChange={handleChange}
                                placeholder="Где купить"
                                required
                                type="text"
                                value={formData.buy}
                            />
                        </label>
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

export default ProductForm
