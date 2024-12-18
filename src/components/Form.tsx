import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import { FormEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { type Product } from '../features/products'
import { type Tool } from '../features/tools'
import { AdaptiveNavBar } from './AdaptiveNavBar'
import { TopPanel } from './TopPanel'

interface FormProps {
    children: ReactNode
    formData: Product | Tool
    onSubmit: (tool: Product | Tool) => void
    title: string
}

export const Form = ({ children, formData, onSubmit, title }: FormProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
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
                        {children}
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
