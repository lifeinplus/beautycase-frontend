import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks/hooks'
import { useGetMineProductCategoriesWithCountsQuery } from '@/features/categories/api/categoriesApi'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useToBackstageGalleryAction } from '@/pages/backstage/gallery/hooks/useToBackstageGalleryAction'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { ProductCategoriesMobileView } from '@/widgets/product/categories/mobile-view/ProductCategoriesMobileView'
import { ProductCategoriesTable } from '@/widgets/product/categories/table/ProductCategoriesTable'

export const ProductGallery = () => {
    const { t } = useTranslation(['product', 'category'])
    const dispatch = useAppDispatch()
    const backAction = useToBackstageGalleryAction()

    const { data, isLoading, error } =
        useGetMineProductCategoriesWithCountsQuery()

    useEffect(() => {
        dispatch(clearFormData())
    }, [dispatch])

    const title = t('titles.gallery')

    return (
        <article className="pb-13 md:pb-0">
            <TopPanel title={title} onBack={backAction.onClick} />
            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto my-6 w-full pb-6 md:my-0 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} hideOnMobile />
                    <DataWrapper isLoading={isLoading} error={error}>
                        <ProductCategoriesMobileView categories={data} />
                        <ProductCategoriesTable categories={data} />
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
