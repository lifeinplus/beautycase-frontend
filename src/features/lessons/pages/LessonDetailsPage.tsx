import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { DetailsPage } from '../../../components'
import { getYouTubeEmbedUrl } from '../../../utils'
import { Product } from '../../products'
import { useDeleteLessonMutation, useGetLessonByIdQuery } from '../../lessons'

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

    const embedUrl = getYouTubeEmbedUrl(data?.videoUrl)

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle="Урок"
            redirectPath="/lessons"
            title={data?.title}
            subtitle={data?.shortDescription}
            description={data?.fullDescription}
            deleteMutation={useDeleteLessonMutation}
            mediaContent={
                <div className="lesson-video-container">
                    {embedUrl ? (
                        <iframe
                            width="100%"
                            height="315"
                            src={embedUrl}
                            title={data?.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img
                            alt={`${data?.title} Thumbnail`}
                            className="lesson-card-thumbnail-image"
                            src={import.meta.env.VITE_DEFAULT_THUMBNAIL_URL}
                        />
                    )}
                </div>
            }
            additionalContent={
                <div className="page-gallery__container">
                    {data?.products?.map((product: Product) => (
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
