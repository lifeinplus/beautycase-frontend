import { GalleryPage } from '../../../components'
import { LessonCard } from '../components/LessonCard'
import { useGetLessonsQuery } from '../lessonsApiSlice'

export const LessonsGalleryPage = () => {
    const { data: lessons, isLoading, error } = useGetLessonsQuery()

    return (
        <GalleryPage
            redirectPath="/lessons"
            title="Уроки"
            isLoading={isLoading}
            error={error}
            mediaContent={
                <section className="page-gallery__container--video">
                    {lessons?.map((lesson) => (
                        <LessonCard key={lesson._id} lesson={lesson} />
                    ))}
                </section>
            }
        />
    )
}
