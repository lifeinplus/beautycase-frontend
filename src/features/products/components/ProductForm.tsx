import { CheckIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import type { Product } from '../types'

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
                <article className="max-w-product xl:max-w-product-xl mx-auto">
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
                    className="adaptive-nav-bar__button"
                    onClick={handleSubmit}
                >
                    <CheckIcon className="adaptive-nav-bar__button__icon" />
                    <span className="adaptive-nav-bar__button__text">
                        Сохранить
                    </span>
                </button>
            </AdaptiveNavBar>
        </article>
    )
}

export default ProductForm
