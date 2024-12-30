import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    Modal,
    NavigationButton,
    TopPanel,
} from '../../../components'
import { getErrorMessage, getYouTubeEmbedUrl } from '../../../utils'
import { clearFormData } from '../../form'
import {
    useDeleteLessonMutation,
    useGetLessonByIdQuery,
} from '../lessonsApiSlice'

export const LessonDetailsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const dispatch = useAppDispatch()
    const { data: lesson, isLoading, error } = useGetLessonByIdQuery(id!)
    const [deleteLesson] = useDeleteLessonMutation()

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading lesson</div>

    if (!lesson) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Lesson not found</p>
            </div>
        )
    }

    const embedUrl = getYouTubeEmbedUrl(lesson.videoUrl)

    const handleBack = () => {
        navigate('/lessons')
    }

    const handleDelete = async () => {
        if (!id) return

        try {
            await deleteLesson(id).unwrap()
            navigate('/lessons')
            setIsModalOpen(false)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleProduct = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    return (
        <article className="page">
            <TopPanel title="Урок" onBack={handleBack} />

            <main className="page-content">
                <section className="w-full max-w-2xl space-y-6">
                    <article className="page-content__container">
                        <section className="page-content__title">
                            <h1 className="page-content__title__headline">
                                {lesson.title}
                            </h1>
                            <p className="page-content__title__byline">
                                {lesson.shortDescription}
                            </p>
                        </section>

                        <div className="lesson-video-container">
                            {embedUrl ? (
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={embedUrl}
                                    title={lesson.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img
                                    alt={`${lesson.title} Thumbnail`}
                                    className="lesson-card-thumbnail-image"
                                    src={
                                        import.meta.env
                                            .VITE_DEFAULT_THUMBNAIL_URL
                                    }
                                />
                            )}
                        </div>

                        <div className="page-content__description">
                            <p className="text-sm">{lesson.fullDescription}</p>
                        </div>

                        <div className="page-gallery__container">
                            {lesson.productIds?.map((product) => (
                                <div
                                    key={product._id}
                                    className="img-container img-container-square"
                                    onClick={() => handleProduct(product._id)}
                                >
                                    <img
                                        alt={product.name}
                                        className="img img-sm-rounded"
                                        src={product.image}
                                    />
                                </div>
                            ))}
                        </div>
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
                    icon={<PencilSquareIcon className="h-6 w-6" />}
                    text="Редактировать"
                    onClick={() => navigate(`/lessons/edit/${id}`)}
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
