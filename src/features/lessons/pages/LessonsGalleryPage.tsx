import { GalleryPage } from '../../../components/gallery/GalleryPage'
import { VideoCard } from '../../../components/gallery/VideoCard'
import { useGetAllLessonsQuery } from '../lessonsApi'

export const LessonsGalleryPage = () => {
    const { data: lessons, isLoading, error } = useGetAllLessonsQuery()

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
