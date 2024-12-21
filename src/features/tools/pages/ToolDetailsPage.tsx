import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { Modal } from '../../modals'
import { useDeleteToolMutation, useGetToolByIdQuery } from '../toolsApiSlice'

export const ToolDetailsPage = () => {
    const { state } = useLocation()
    const { id } = useParams()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const dispatch = useAppDispatch()
    const { data: tool, isLoading, error } = useGetToolByIdQuery(id || '')

    const [deleteTool] = useDeleteToolMutation()

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading tool</div>

    if (!tool) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Tool not found</p>
            </div>
        )
    }

    const handleBack = () => {
        if (state?.fromMakeupBag) {
            navigate(state?.fromPathname, {
                replace: true,
                state: { scrollId: id },
            })
            return
        }

        navigate('/tools')
    }

    const handleDelete = async () => {
        if (!id) return

        try {
            await deleteTool(id).unwrap()
            navigate('/tools')
            setIsModalOpen(false)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <article className="page">
            <TopPanel title="Инструмент" onBack={handleBack} />

            <main className="page-content">
                <article className="page-content__container">
                    <section className="page-content__title">
                        <h1 className="page-content__title__headline">
                            {tool.name}
                        </h1>
                    </section>

                    <section className="page-content__image">
                        <div className="img-container">
                            <img
                                src={tool.image}
                                alt={tool.name}
                                className="img"
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
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text="Назад"
                    onClick={handleBack}
                    className="nav-btn-back"
                />
                <NavigationButton
                    icon={<PencilSquareIcon className="h-6 w-6" />}
                    text="Редактировать"
                    onClick={() => navigate(`/tools/edit/${id}`)}
                />
                <NavigationButton
                    icon={<TrashIcon className="h-6 w-6" />}
                    text="Удалить"
                    onClick={() => setIsModalOpen(true)}
                />
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
