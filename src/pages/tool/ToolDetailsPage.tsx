import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Image } from '@/shared/components/ui/Image'
import imageStyles from '@/shared/components/ui/image.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import storeStyles from '@/shared/components/ui/store-link.module.css'
import { DetailsPage } from '@/widgets/DetailsPage'
import {
    useDeleteToolByIdMutation,
    useGetToolByIdQuery,
} from '../../features/tools/toolsApi'

export const ToolDetailsPage = () => {
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation('tool')

    const { data, isLoading, error } = useGetToolByIdQuery(id!)
    const [deleteToolById] = useDeleteToolByIdMutation()

    return (
        <DetailsPage
            isLoading={isLoading}
            error={error}
            topPanelTitle={t('titles.details')}
            redirectPath="/tools"
            title={data?.name}
            subtitle={data?.brand?.name}
            deleteItem={deleteToolById}
            mediaContent={
                <section className={pageStyles.contentImage}>
                    <div
                        className={classNames(
                            imageStyles.container,
                            imageStyles.rectangle
                        )}
                    >
                        <Image alt={data?.name} src={data?.imageUrl} />
                    </div>
                </section>
            }
            descriptionContent={
                <>
                    {data?.number && (
                        <section className={pageStyles.contentDescription}>
                            <p>{`${t('number')}: ${data?.number}`}</p>
                        </section>
                    )}
                    {data?.comment && (
                        <section className={pageStyles.contentDescription}>
                            <p>{data?.comment}</p>
                        </section>
                    )}
                </>
            }
            additionalContent={
                data?.storeLinks?.length !== 0 && (
                    <section className={pageStyles.contentDescription}>
                        <p className="mb-3 font-bold">{t('links')}</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            {data?.storeLinks?.map((l, i) => (
                                <a
                                    key={i}
                                    href={l.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className={storeStyles.storeLink}>
                                        {l.name}
                                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>
                )
            }
        />
    )
}
