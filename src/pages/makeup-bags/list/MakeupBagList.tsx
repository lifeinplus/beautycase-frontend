import { useTranslation } from 'react-i18next'

import { useGetAllMakeupBagsQuery } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagMobileView } from '@/features/makeup-bags/components/mobile-view/MakeupBagMobileView'
import { MakeupBagTable } from '@/features/makeup-bags/components/table/MakeupBagTable'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { Header } from '@/shared/components/layout/header/Header'
import pageStyles from '@/shared/components/ui/page/page.module.css'

export const MakeupBagList = () => {
    const { t } = useTranslation(['makeupBag'])
    const { data = [], isLoading, error } = useGetAllMakeupBagsQuery()

    const title = [t('hero.headline'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessageList')}
                    >
                        <>
                            <MakeupBagMobileView makeupBags={data} />
                            <MakeupBagTable makeupBags={data} />
                        </>
                    </DataWrapper>
                </article>
            </main>
        </article>
    )
}
