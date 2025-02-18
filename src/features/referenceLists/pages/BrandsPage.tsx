import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import {
    AdaptiveNavBar,
    Hero,
    NavigationButton,
    TopPanel,
} from '../../../components'

export const BrandsPage = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/reference_lists')
    }

    return (
        <article>
            <TopPanel title="Бренды" onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero headline="Бренды" />
                    </div>
                </article>
            </main>

            <AdaptiveNavBar>
                <NavigationButton
                    icon={<ArrowLeftIcon className="h-6 w-6" />}
                    text="Назад"
                    onClick={handleBack}
                    className="nav-btn-back"
                />
            </AdaptiveNavBar>
        </article>
    )
}
