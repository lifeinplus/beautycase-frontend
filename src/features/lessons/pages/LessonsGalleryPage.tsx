import { PlusIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { AdaptiveNavBar, NavigationButton, TopPanel } from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { LessonCard } from '../components/LessonCard'
import { useGetLessonsQuery } from '../lessonsApiSlice'

export const LessonsGalleryPage = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { data: lessons, isLoading, error } = useGetLessonsQuery()

    const title = 'Уроки'

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    const handleAdd = () => {
        navigate('/lessons/add')
    }

    return (
        <article className="page">
            <TopPanel title={title} onBack={() => navigate('/')} />

            <main className="page-content">
                <section className="page-gallery__title">
                    <h1 className="page-gallery__title__text">{title}</h1>
                </section>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{getErrorMessage(error)}</div>
                ) : (
                    <section className="page-gallery__container--video">
                        {lessons?.map((lesson) => (
                            <LessonCard key={lesson._id} lesson={lesson} />
                        ))}
                    </section>
                )}
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<PlusIcon className="h-6 w-6" />}
                    text="Добавить"
                    onClick={handleAdd}
                />
            </AdaptiveNavBar>
        </article>
    )
}
