import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import {
    AdaptiveNavBar,
    DataWrapper,
    Hero,
    Modal,
    NavigationButton,
    TopPanel,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import {
    Brand,
    BrandForm,
    BrandsMobileView,
    BrandsTable,
    useDeleteBrandMutation,
    useReadBrandsQuery,
} from '../../brands'
import { useAppDispatch } from '../../../app/hooks'
import { clearFormData } from '../../form'

export const BrandsPage = () => {
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [brand, setBrand] = useState<Brand>()

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useReadBrandsQuery()
    const [deleteBrand] = useDeleteBrandMutation()

    const handleBack = () => {
        navigate('/reference_lists')
    }

    const handleDelete = async (data: Brand) => {
        setBrand(data)
        setIsModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!brand?._id) return

        try {
            await deleteBrand(brand._id).unwrap()
            toast.success('Бренд удалён')
            dispatch(clearFormData())
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalOpen(false)
        }
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
                                <BrandsMobileView
                                    items={data}
                                    onDelete={handleDelete}
                                />
                                <BrandsTable
                                    items={data}
                                    onDelete={handleDelete}
                                />
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

            <Modal
                isOpen={isModalOpen}
                title="Удалить?"
                description={`Вы действительно хотите удалить ${brand?.name}?`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsModalOpen(false)}
            />
        </article>
    )
}
