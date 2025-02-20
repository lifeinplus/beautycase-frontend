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
    StoreForm,
    StoresMobileView,
    StoresTable,
    useReadStoresQuery,
} from '../../stores'

export const StoresPage = () => {
    const navigate = useNavigate()

    const { data, isLoading, error } = useReadStoresQuery()

    const handleBack = () => {
        navigate('/reference_lists')
    }

    return (
        <article>
            <TopPanel title="Магазины" onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero headline="Магазины" />
                    </div>

                    <StoreForm />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage="Магазины не найдены"
                    >
                        {data && (
                            <>
                                <StoresMobileView items={data} />
                                <StoresTable items={data} />
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
