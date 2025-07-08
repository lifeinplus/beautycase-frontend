import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/lessonsApi'
import type { Product } from '@/features/products/types'
import galleryStyles from '@/shared/components/gallery/gallery.module.css'
import styles from './LessonDetailsPage.module.css'
import { Image } from '@/shared/components/ui/Image'
import { getYouTubeEmbedUrl } from '@/shared/utils/youtube'
import { DetailsPage } from '@/widgets/DetailsPage'

export const LessonDetailsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('lesson')

    const { data, isLoading, error } = useGetLessonByIdQuery(id!)
    const [deleteLessonById] = useDeleteLessonByIdMutation()

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
            topPanelTitle={t('titles.details')}
            redirectPath="/lessons"
            title={data?.title}
            subtitle={data?.shortDescription}
            description={data?.fullDescription}
            deleteItem={deleteLessonById}
            mediaContent={
                <div className={styles.container}>
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
                        <Image
                            alt={`${data?.title} Thumbnail`}
                            src={import.meta.env.VITE_DEFAULT_THUMBNAIL_URL}
                        />
                    )}
                </div>
            }
            additionalContent={
                <div className={galleryStyles.container}>
                    {data?.products?.map((product: Product) => (
                        <div
                            key={product._id}
                            className="img-container img-container-square"
                            onClick={() => handleProduct(product._id)}
                        >
                            <Image alt={product.name} src={product.imageUrl} />
                        </div>
                    ))}
                </div>
            }
        />
    )
}
