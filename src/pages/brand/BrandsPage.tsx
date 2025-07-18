import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import {
    useDeleteBrandByIdMutation,
    useGetAllBrandsQuery,
} from '@/features/brands/brandsApi'
import { BrandForm } from '@/features/brands/components/BrandForm'
import { BrandsMobileView } from '@/features/brands/components/BrandsMobileView'
import { BrandsTable } from '@/features/brands/components/BrandsTable'
import { Brand } from '@/features/brands/types'
import { clearFormData, setFormData } from '@/features/form/formSlice'
import type { FormRef } from '@/features/form/types'
import { DataWrapper } from '@/shared/components/common/DataWrapper'
import { Hero } from '@/shared/components/common/Hero'
import { TopPanel } from '@/shared/components/layout/TopPanel'
import { ModalDelete } from '@/shared/components/modals/ModalDelete'
import { NavBar } from '@/shared/components/navigation/NavBar'
import { NavButton } from '@/shared/components/navigation/NavButton'
import navStyles from '@/shared/components/navigation/navigation.module.css'
import pageStyles from '@/shared/components/ui/page.module.css'
import { getErrorMessage } from '@/shared/utils/errorUtils'

export const BrandsPage = () => {
    const navigate = useNavigate()
    const brandFormRef = useRef<FormRef | null>(null)
    const { t } = useTranslation(['brand', 'modal'])

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [brand, setBrand] = useState<Brand>()

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useGetAllBrandsQuery()
    const [deleteBrandById] = useDeleteBrandByIdMutation()

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
            await deleteBrandById(brand._id).unwrap()
            toast.success(t('toast.delete'))
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
            <TopPanel title={t('hero.headline')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <div className="hidden sm:block">
                        <Hero headline={t('hero.headline')} />
                    </div>

                    <BrandForm ref={brandFormRef} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessageList')}
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

            <NavBar>
                <NavButton
                    icon={ArrowLeftIcon}
                    label={t('navigation:actions.back')}
                    onClick={handleBack}
                    className={navStyles.navBtnBack}
                />
            </NavBar>

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
