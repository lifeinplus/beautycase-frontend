import { CheckIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BottomPanel, TopPanel } from '../../../components'
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
        <div className="relative flex min-h-screen flex-col">
            <TopPanel title={title} onBack={() => navigate(-1)} />

            <form
                onSubmit={handleSubmit}
                className="flex-grow space-y-4 px-3 pb-16 pt-16"
            >
                <label className="block">
                    <span className="block py-4 font-medium">Название</span>
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
                    <span className="block py-4 font-medium">
                        URL изображения
                    </span>
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
                    <span className="block py-4 font-medium">Где купить</span>
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

            <BottomPanel>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bottom-panel__button"
                >
                    <CheckIcon className="h-6 w-6" />
                </button>
            </BottomPanel>
        </div>
    )
}

export default ProductForm
