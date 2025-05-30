import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../app/hooks'
import { DataWrapper } from '../../../components/DataWrapper'
import { Hero } from '../../../components/Hero'
import { TopPanel } from '../../../components/TopPanel'
import { AdaptiveNavBar } from '../../../components/navigation/AdaptiveNavBar'
import { NavigationButton } from '../../../components/navigation/NavigationButton'
import { ModalDelete } from '../../../components/ui/ModalDelete'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData, setFormData } from '../../form/formSlice'
import type { FormRef } from '../../form/types'
import { StoreForm } from '../components/StoreForm'
import { StoresMobileView } from '../components/StoresMobileView'
import { StoresTable } from '../components/StoresTable'
import { useDeleteStoreByIdMutation, useGetAllStoresQuery } from '../storesApi'
import type { Store } from '../types'

export const StoresPage = () => {
    const navigate = useNavigate()
    const storeFormRef = useRef<FormRef | null>(null)

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [store, setStore] = useState<Store>()

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useGetAllStoresQuery()
    const [deleteStoreById] = useDeleteStoreByIdMutation()

    const handleBack = () => {
        navigate('/reference_lists')
    }

    const handleDelete = async (data: Store) => {
        setStore(data)
        setIsModalDeleteOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!store?._id) return

        try {
            await deleteStoreById(store._id).unwrap()
            toast.success('Магазин удалён')
            dispatch(clearFormData())
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
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

            <ModalDelete
                isOpen={isModalDeleteOpen}
                title="Удалить?"
                description={`Вы действительно хотите удалить ${store?.name}?`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsModalDeleteOpen(false)}
            />
        </article>
    )
}
