import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/lessonsApi'
import { Image } from '@/shared/components/ui/Image'
import type { RouteId } from '@/shared/types/router'
import { getYouTubeEmbedUrl } from '@/shared/utils/youtube'
import { ProductImages } from '@/widgets/product/product-images/ProductImages'
import { Details } from '@/widgets/view/details/Details'
import styles from './LessonDetails.module.css'

export const LessonDetails = () => {
    const { id } = useParams<RouteId>()
    const { t } = useTranslation('lesson')

    const { data, isLoading, error } = useGetLessonByIdQuery(id!)
    const [deleteLessonById] = useDeleteLessonByIdMutation()

    const embedUrl = data?.videoUrl && getYouTubeEmbedUrl(data?.videoUrl)

    return (
        <Details
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
            additionalContent={<ProductImages products={data?.products} />}
        />
    )
}
