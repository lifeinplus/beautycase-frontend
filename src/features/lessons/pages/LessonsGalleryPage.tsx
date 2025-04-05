import { GalleryPage } from '../../../components/gallery/GalleryPage'
import { VideoCard } from '../../../components/gallery/VideoCard'
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
                <section className="gallery-container-video">
                    {lessons?.map((lesson) => (
                        <VideoCard
                            key={lesson._id}
                            data={lesson}
                            path={`/lessons/${lesson._id}`}
                        />
                    ))}
                </section>
            }
        />
    )
}
