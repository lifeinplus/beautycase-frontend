import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import {
    useDeleteBrandByIdMutation,
    useGetAllBrandsQuery,
} from '@/features/brands/api/brandsApi'
import { BrandForm } from '@/features/brands/components/form/BrandForm'
import { BrandsMobileView } from '@/features/brands/components/mobile-view/BrandsMobileView'
import { BrandsTable } from '@/features/brands/components/table/BrandsTable'
import { Brand } from '@/features/brands/types'
import { clearFormData, setFormData } from '@/features/form/slice/formSlice'
import type { FormRef } from '@/features/form/types'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ModalDelete } from '@/shared/components/modals/delete/ModalDelete'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const Brands = () => {
    const navigate = useNavigate()
    const brandFormRef = useRef<FormRef | null>(null)
    const { t } = useTranslation(['brand', 'modal'])

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [brand, setBrand] = useState<Brand>()

    const dispatch = useAppDispatch()
    const { data = [], isLoading, error } = useGetAllBrandsQuery()
    const [deleteBrandById] = useDeleteBrandByIdMutation()

    const handleBack = () => {
        navigate('/reference-lists')
    }

    const handleDelete = async (data: Brand) => {
        setBrand(data)
        setIsModalDeleteOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!brand?._id) return

        try {
            await deleteBrandById(brand._id).unwrap()
            toast.success(t('modal:delete.toast', { name: brand.name }))
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

    const title = [t('titles.list'), data.length && `(${data.length})`]
        .filter(Boolean)
        .join(' ')

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={title} hideOnMobile />

                    <BrandForm ref={brandFormRef} />

                    <DataWrapper isLoading={isLoading} error={error}>
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

            <ModalDelete
                isOpen={isModalDeleteOpen}
                title={t('modal:delete.title')}
                description={t('modal:delete.description', {
                    name: brand?.name,
                })}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsModalDeleteOpen(false)}
            />
        </article>
    )
}
