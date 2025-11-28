import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData, setFormData } from '@/features/form/slice/formSlice'
import type { FormRef } from '@/features/form/types'
import {
    useDeleteStoreByIdMutation,
    useGetAllStoresQuery,
} from '@/features/stores/api/storesApi'
import { StoreForm } from '@/features/stores/components/form/StoreForm'
import { StoresMobileView } from '@/features/stores/components/mobile-view/StoresMobileView'
import { StoresTable } from '@/features/stores/components/table/StoresTable'
import type { Store } from '@/features/stores/types'
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ModalDelete } from '@/shared/components/modals/delete/ModalDelete'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { titleWithCount } from '@/shared/utils/ui/titleWithCount'

export const Stores = () => {
    const storeFormRef = useRef<FormRef | null>(null)
    const { t } = useTranslation(['store', 'modal'])

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [store, setStore] = useState<Store>()

    const dispatch = useAppDispatch()
    const { data = [], isLoading, error } = useGetAllStoresQuery()
    const [deleteStoreById] = useDeleteStoreByIdMutation()

    const handleDelete = async (data: Store) => {
        setStore(data)
        setIsModalDeleteOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!store?._id) return

        try {
            await deleteStoreById(store._id).unwrap()
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

    const title = titleWithCount(t('titles.list'), data.length)

    return (
        <article>
            <TopPanel title={title} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <Hero title={title} hideOnMobile />
                    <StoreForm ref={storeFormRef} />
                    <DataWrapper isLoading={isLoading} error={error}>
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
                    </DataWrapper>
                </article>
            </main>

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
