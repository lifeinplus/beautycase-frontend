import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import { isDataMessageError, isFetchBaseQueryError } from '../../../utils'
import { Modal } from '../../modals'
import { useDeleteToolMutation, useGetToolByIdQuery } from '../toolsApiSlice'

export const ToolDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { data: tool, isLoading, error } = useGetToolByIdQuery(id || '')

    const [deleteTool] = useDeleteToolMutation()

    if (!tool) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Tool not found</p>
            </div>
        )
    }

    const handleDelete = async () => {
        if (!id) return

        try {
            await deleteTool(id).unwrap()
            navigate('/tools_gallery')
            setIsModalOpen(false)
        } catch (error) {
            if (isDataMessageError(error)) {
                toast.error(error.data.message)
            } else if (isFetchBaseQueryError(error)) {
                const errMsg =
                    'error' in error ? error.error : JSON.stringify(error.data)
                toast.error(errMsg)
            } else {
                console.error(error)
            }
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading tool</div>

    return (
        <article className="page-container">
            <TopPanel
                title="Инструмент"
                onBack={() => navigate('/tools_gallery')}
            />

            <main className="page-content">
                <article className="page-content__container">
                    <section className="page-content__title">
                        <h1 className="page-content__title__text">
                            {tool.name}
                        </h1>
                    </section>

                    <section className="page-content__image">
                        <div className="makeup-item__image-container--rectangle">
                            <img
                                src={tool.image}
                                alt={tool.name}
                                className="makeup-item__image"
                            />
                        </div>
                    </section>

                    <section className="page-content__description">
                        <p>{tool.number}</p>
                        <p>{tool.comment}</p>
                    </section>
                </article>
            </main>

            <AdaptiveNavBar>
                <button
                    className="adaptive-nav-bar__button--action"
                    onClick={() => navigate(`/tools_gallery/edit/${id}`)}
                >
                    <PencilSquareIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Редактировать</span>
                </button>
                <button
                    className="adaptive-nav-bar__button--action"
                    onClick={() => setIsModalOpen(true)}
                >
                    <TrashIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Удалить</span>
                </button>
            </AdaptiveNavBar>

            <Modal
                isOpen={isModalOpen}
                title="Удалить?"
                description="Вы действительно хотите удалить этот инструмент?"
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </article>
    )
}
