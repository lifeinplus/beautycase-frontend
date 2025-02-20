import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import {
    AdaptiveNavBar,
    DataWrapper,
    Hero,
    NavigationButton,
    TopPanel,
} from '../../../components'
import {
    BrandForm,
    BrandsMobileView,
    BrandsTable,
    useReadBrandsQuery,
} from '../../brands'

export const BrandsPage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useReadBrandsQuery()

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

                    <BrandForm />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage="Бренды не найдены"
                    >
                        {data && (
                            <>
                                <BrandsMobileView items={data} />
                                <BrandsTable items={data} />
                            </>
                        )}
                    </DataWrapper>
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
