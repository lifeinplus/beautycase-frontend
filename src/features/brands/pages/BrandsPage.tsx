import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import {
    AdaptiveNavBar,
    DataWrapper,
    Hero,
    ModalDelete,
    NavigationButton,
    TopPanel,
} from '../../../components'
import { getErrorMessage } from '../../../utils'
import {
    type Brand,
    BrandForm,
    BrandsMobileView,
    BrandsTable,
    useDeleteBrandMutation,
    useReadBrandsQuery,
} from '../../brands'
import { clearFormData, type FormRef, setFormData } from '../../form'

export const BrandsPage = () => {
    const navigate = useNavigate()
    const brandFormRef = useRef<FormRef | null>(null)

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [brand, setBrand] = useState<Brand>()

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useReadBrandsQuery()
    const [deleteBrand] = useDeleteBrandMutation()

    const handleBack = () => {
        navigate('/reference_lists')
    }

    const handleDelete = async (data: Brand) => {
        setBrand(data)
        setIsModalDeleteOpen(true)
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
            setIsModalDeleteOpen(false)
        }
    }

    const handleEdit = (data: Brand) => {
        dispatch(setFormData(data))
        brandFormRef.current?.focusInput()
    }

    return (
        <article>
            <TopPanel title="Бренды" onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero headline="Бренды" />
                    </div>

                    <BrandForm ref={brandFormRef} />

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
                                    onEdit={handleEdit}
                                />
                                <BrandsTable
                                    items={data}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
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

            <ModalDelete
                isOpen={isModalDeleteOpen}
                title="Удалить?"
                description={`Вы действительно хотите удалить ${brand?.name}?`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsModalDeleteOpen(false)}
            />
        </article>
    )
}
