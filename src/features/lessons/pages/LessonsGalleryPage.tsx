import { PlusIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import { AdaptiveNavBar, TopPanel } from '../../../components'
import { LessonCard } from '../components/LessonCard'
import { useGetLessonsQuery } from '../lessonsApiSlice'

export const LessonsGalleryPage = () => {
    const navigate = useNavigate()
    const { data: lessons, isLoading, error } = useGetLessonsQuery()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading lessons</div>

    const title = 'Уроки'

    return (
        <article className="page">
            <TopPanel title={title} onBack={() => navigate('/')} />

            <main className="page-content">
                <section className="page-gallery__title">
                    <h1 className="page-gallery__title__text">{title}</h1>
                </section>
                <section className="page-gallery__container--video">
                    {lessons?.map((lesson) => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </section>
            </main>

            <AdaptiveNavBar>
                <button
                    className="nav-btn"
                    onClick={() => navigate('/lessons/add')}
                >
                    <PlusIcon className="h-6 w-6" />
                    <span className="hidden lg:inline">Добавить</span>
                </button>
            </AdaptiveNavBar>
        </article>
    )
}
