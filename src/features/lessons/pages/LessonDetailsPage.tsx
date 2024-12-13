import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import { isDataMessageError, isFetchBaseQueryError } from '../../../utils'
import { Modal } from '../../modals'
import {
    useDeleteLessonMutation,
    useGetLessonByIdQuery,
} from '../lessonsApiSlice'

export const LessonDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { data: lesson, isLoading, error } = useGetLessonByIdQuery(id || '')

    const [deleteLesson] = useDeleteLessonMutation()

    if (!lesson) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Lesson not found</p>
            </div>
        )
    }

    const handleDelete = async () => {
        if (!id) return

        try {
            await deleteLesson(id).unwrap()
            navigate('/lessons')
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
    if (error) return <div>Error loading lesson</div>

    const getYouTubeEmbedUrl = (videoUrl: string) => {
        const videoId = new URL(videoUrl).searchParams.get('v')
        return `https://www.youtube.com/embed/${videoId}`
    }

    return (
        <article className="page">
            <TopPanel title="Урок" onBack={() => navigate('/lessons')} />

            <main className="page-content">
                <article className="page-content__container">
                    <section className="page-content__title">
                        <h1 className="page-content__title__headline">
                            {lesson.title}
                        </h1>
                        <p className="page-content__title__byline">
                            {lesson.shortDescription}
                        </p>
                    </section>

                    <div className="lesson-video-container mb-6">
                        <iframe
                            width="100%"
                            height="315"
                            src={getYouTubeEmbedUrl(lesson.videoUrl)}
                            title={lesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="page-content__description">
                        <p className="text-sm">{lesson.fullDescription}</p>
                    </div>
                </article>
            </main>

            <AdaptiveNavBar>
                <button
                    className="nav-btn"
                    onClick={() => navigate(`/lessons/edit/${id}`)}
                >
                    <PencilSquareIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Редактировать</span>
                </button>
                <button
                    className="nav-btn"
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
