import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
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
    type Store,
    StoreForm,
    StoresMobileView,
    StoresTable,
    useDeleteStoreMutation,
    useReadStoresQuery,
} from '../../stores'
import { clearFormData, type FormRef, setFormData } from '../../form'

export const StoresPage = () => {
    const navigate = useNavigate()
    const storeFormRef = useRef<FormRef | null>(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [store, setStore] = useState<Store>()

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useReadStoresQuery()
    const [deleteStore] = useDeleteStoreMutation()

    const handleBack = () => {
        navigate('/reference_lists')
    }

    const handleDelete = async (data: Store) => {
        setStore(data)
        setIsModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!store?._id) return

        try {
            await deleteStore(store._id).unwrap()
            toast.success('Магазин удалён')
            dispatch(clearFormData())
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalOpen(false)
        }
    }

    const handleEdit = (data: Store) => {
        dispatch(setFormData(data))
        storeFormRef.current?.focusInput()
    }

    return (
        <article>
            <TopPanel title="Магазины" onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero headline="Магазины" />
                    </div>

                    <StoreForm ref={storeFormRef} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage="Магазины не найдены"
                    >
                        {data && (
                            <>
                                <StoresMobileView
                                    items={data}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                                <StoresTable
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

            <Modal
                isOpen={isModalOpen}
                title="Удалить?"
                description={`Вы действительно хотите удалить ${store?.name}?`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsModalOpen(false)}
            />
        </article>
    )
}
