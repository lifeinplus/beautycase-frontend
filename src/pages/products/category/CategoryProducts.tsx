import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetProductsByCategoryQuery } from '@/features/products/api/productsApi'
import { ImageCard } from '@/shared/components/gallery/image-card/ImageCard'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'

export const CategoryProducts = () => {
    const navigate = useNavigate()
    const { category } = useParams()
    const { t } = useTranslation('product')

    const {
        data = [],
        isLoading,
        error,
    } = useGetProductsByCategoryQuery(category!)

    const handleBack = () => {
        navigate('/products')
    }

    const title = [
        t(`categories.${category}`),
        data.length && `(${data.length})`,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <article className="pb-13 sm:pb-0">
            <TopPanel title={title} onBack={handleBack} />
            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero headline={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <article className="mx-auto my-4 grid max-w-2xl grid-cols-3 gap-1 sm:gap-7">
                            {data.map((p) => (
                                <ImageCard
                                    key={p._id}
                                    data={p}
                                    path={`/products/${p._id}`}
                                />
                            ))}
                        </article>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
