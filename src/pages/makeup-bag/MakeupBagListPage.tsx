import { useTranslation } from 'react-i18next'

import { MakeupBagMobileView } from '@/features/makeupBags/components/MakeupBagMobileView'
import { MakeupBagTable } from '@/features/makeupBags/components/MakeupBagTable'
import { useGetAllMakeupBagsQuery } from '@/features/makeupBags/makeupBagsApi'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { Header } from '@/shared/components/layout/Header'
import pageStyles from '@/shared/components/ui/page.module.css'

export const MakeupBagListPage = () => {
    const { t } = useTranslation(['makeupBag'])
    const { data, isLoading, error } = useGetAllMakeupBagsQuery()

    return (
        <article>
            <Header />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={t('hero.headline')} />

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
