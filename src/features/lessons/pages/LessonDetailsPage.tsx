import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { DetailsPage, LoadingOrError } from '../../../components'
import { getYouTubeEmbedUrl } from '../../../utils'
import { Product } from '../../products'
import {
    useDeleteLessonMutation,
    useGetLessonByIdQuery,
} from '../lessonsApiSlice'

export const LessonDetailsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useGetLessonByIdQuery(id!)

    const handleProduct = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    if (isLoading) return <LoadingOrError message="Загрузка..." />
    if (error) return <LoadingOrError message="Ошибка загрузки" />
    if (!data) return <LoadingOrError message="Урок не найден" />

    const { title, shortDescription, videoUrl, fullDescription, productIds } =
        data

    const embedUrl = getYouTubeEmbedUrl(videoUrl)

    return (
        <DetailsPage
            topPanelTitle="Урок"
            redirectPath="/lessons"
            title={title}
            subtitle={shortDescription}
            description={fullDescription}
            deleteMutation={useDeleteLessonMutation}
            mediaContent={
                <div className="lesson-video-container">
                    {embedUrl ? (
                        <iframe
                            width="100%"
                            height="315"
                            src={embedUrl}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img
                            alt={`${title} Thumbnail`}
                            className="lesson-card-thumbnail-image"
                            src={import.meta.env.VITE_DEFAULT_THUMBNAIL_URL}
                        />
                    )}
                </div>
            }
            additionalContent={
                <div className="page-gallery__container">
                    {productIds?.map((product: Product) => (
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
            }
        />
    )
}
