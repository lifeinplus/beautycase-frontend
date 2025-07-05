import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { ModalDelete } from '@/shared/components/modals/ModalDelete'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { clearFormData, setFormData } from '@/features/form/formSlice'
import type { FormRef } from '@/features/form/types'
import { StoreForm } from '../components/StoreForm'
import { StoresMobileView } from '../components/StoresMobileView'
import { StoresTable } from '../components/StoresTable'
import { useDeleteStoreByIdMutation, useGetAllStoresQuery } from '../storesApi'
import type { Store } from '../types'

export const StoresPage = () => {
    const navigate = useNavigate()
    const storeFormRef = useRef<FormRef | null>(null)
    const { t } = useTranslation('store')

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
            toast.success(t('toast.delete'))
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
            <TopPanel title={t('titles.list')} onBack={handleBack} />

            <main className="page-content">
                <article className="content-container">
                    <div className="hidden sm:block">
                        <Hero headline={t('titles.list')} />
                    </div>

                    <StoreForm ref={storeFormRef} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessageList')}
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

            <NavBar>
                <NavButton
                    icon={ArrowLeftIcon}
                    label={t('navigation:actions.back')}
                    onClick={handleBack}
                    className="nav-btn-back"
                />
            </NavBar>

            <ModalDelete
                isOpen={isModalDeleteOpen}
                title={t('modal:delete.title')}
                description={t('modal:delete.description', {
                    name: store?.name,
                })}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsModalDeleteOpen(false)}
            />
        </article>
    )
}
