import { PaintBrushIcon, ListBulletIcon } from '@heroicons/react/24/outline'

import {
    AdaptiveNavBar,
    Footer,
    Header,
    Hero,
    NavigationButton,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import { Brands } from '../../brands'
import { Stages } from '../../stages'
import { useGetMakeupBagQuery } from '../makeupBagApiSlice'

export const MakeupBagPage = () => {
    const { data, isLoading, error } = useGetMakeupBagQuery()

    const handleStages = () =>
        document
            .getElementById('stages')
            ?.scrollIntoView({ behavior: 'smooth' })

    const handleBrushes = () =>
        document
            .getElementById('brands')
            ?.scrollIntoView({ behavior: 'smooth' })

    return (
        <article>
            <Header />

            <main className="page-content flex flex-col items-center justify-center">
                <section className="w-full max-w-2xl">
                    <Hero
                        headline="Косметичка"
                        byline="Индивидуальный подбор продуктов"
                        imgUrl="https://res.cloudinary.com/dtx4nqyeb/image/upload/v1732162378/title_gm1yla.png"
                    />

                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{getErrorMessage(error)}</div>
                    ) : (
                        <>
                            <Stages stages={data?.stages} />
                            <Brands brands={data?.brands} />
                        </>
                    )}
                </section>
            </main>

            <Footer />

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ListBulletIcon className="h-6 w-6" />}
                    text="Этапы"
                    onClick={handleStages}
                />
                <NavigationButton
                    icon={<PaintBrushIcon className="h-6 w-6" />}
                    text="Кисти"
                    onClick={handleBrushes}
                />
            </AdaptiveNavBar>
        </article>
    )
}
