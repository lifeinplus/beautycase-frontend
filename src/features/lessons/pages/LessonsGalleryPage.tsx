import { PlusIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    Header,
    NavigationButton,
    PageTitle,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import { clearFormData } from '../../form'
import { LessonCard } from '../components/LessonCard'
import { useGetLessonsQuery } from '../lessonsApiSlice'

export const LessonsGalleryPage = () => {
    const navigate = useNavigate()

    const headline = 'Уроки'

    const dispatch = useAppDispatch()
    const { data: lessons, isLoading, error } = useGetLessonsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [])

    const handleAdd = () => {
        navigate('/lessons/add')
    }

    return (
        <section>
            <Header />

            <main className="page-content">
                <PageTitle headline={headline} />

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
        </section>
    )
}
