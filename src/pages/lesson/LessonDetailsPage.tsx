import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { setFormData } from '@/features/form/formSlice'
import {
    useDeleteLessonByIdMutation,
    useGetLessonByIdQuery,
} from '@/features/lessons/lessonsApi'
import type { Product } from '@/features/products/types'
import galleryStyles from '@/shared/components/gallery/gallery.module.css'
import { Image } from '@/shared/components/ui/Image'
import imageStyles from '@/shared/components/ui/image.module.css'
import { getYouTubeEmbedUrl } from '@/shared/utils/youtube'
import { DetailsPage } from '@/widgets/DetailsPage'
import { SquaresPlusIcon } from '@heroicons/react/24/outline'
import styles from './LessonDetailsPage.module.css'

export const LessonDetailsPage = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('lesson')

    const dispatch = useAppDispatch()

    const { data, isLoading, error } = useGetLessonByIdQuery(id!)
    const [deleteLessonById] = useDeleteLessonByIdMutation()

    const handleProduct = (id?: string) => {
        navigate(`/products/${id}`, {
            state: { fromPathname: pathname },
        })
    }

    const embedUrl = data?.videoUrl && getYouTubeEmbedUrl(data?.videoUrl)

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
                            className={classNames(
                                imageStyles.container,
                                imageStyles.square
                            )}
                            onClick={() => handleProduct(product._id)}
                        >
                            <Image alt={product.name} src={product.imageUrl} />
                        </div>
                    ))}
                    <div
                        className={classNames(
                            imageStyles.container,
                            imageStyles.square,
                            'flex items-center justify-center rounded-md border border-gray-200 bg-white text-black hover:bg-rose-500 dark:border-neutral-700 dark:bg-black dark:text-white dark:hover:bg-rose-600'
                        )}
                        onClick={() => {
                            const productIds = data?.products?.map(
                                (p) => p._id!
                            )

                            dispatch(setFormData({ productIds }))
                            navigate('products')
                        }}
                    >
                        <SquaresPlusIcon className="h-32 w-32 stroke-[0.5]" />
                    </div>
                </div>
            }
        />
    )
}
