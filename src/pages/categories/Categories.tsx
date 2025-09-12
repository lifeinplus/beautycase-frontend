import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import {
    useDeleteCategoryByIdMutation,
    useGetAllCategoriesQuery,
} from '@/features/categories/api/categoriesApi'
import { CategoryForm } from '@/features/categories/components/form/CategoryForm'
import { CategoriesMobileView } from '@/features/categories/components/mobile-view/CategoriesMobileView'
import { CategoriesTable } from '@/features/categories/components/table/CategoriesTable'
import { Category } from '@/features/categories/types'
import { clearFormData, setFormData } from '@/features/form/slice/formSlice'
import type { FormRef } from '@/features/form/types'
import { DataWrapper } from '@/shared/components/common/data-wrapper/DataWrapper'
import { Hero } from '@/shared/components/common/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ModalDelete } from '@/shared/components/modals/delete/ModalDelete'
import pageStyles from '@/shared/components/ui/page/page.module.css'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const Categories = () => {
    const navigate = useNavigate()
    const categoryFormRef = useRef<FormRef | null>(null)
    const { t } = useTranslation(['category', 'modal'])

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [category, setCategory] = useState<Category>()

    const dispatch = useAppDispatch()
    const { data, isLoading, error } = useGetAllCategoriesQuery()
    const [deleteCategoryById] = useDeleteCategoryByIdMutation()

    const handleBack = () => {
        navigate('/reference-lists')
    }

    const handleDelete = async (data: Category) => {
        setCategory(data)
        setIsModalDeleteOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!category?._id) return

        try {
            await deleteCategoryById(category._id).unwrap()
            toast.success(t('modal:delete.toast', { name: category.name }))
            dispatch(clearFormData())
        } catch (err) {
            console.error(err)
            toast.error(getErrorMessage(err))
        } finally {
            setIsModalDeleteOpen(false)
        }
    }

    const handleEdit = (data: Category) => {
        dispatch(setFormData(data))
        categoryFormRef.current?.focusInput()
    }

    return (
        <article>
            <TopPanel title={t('titles.list')} onBack={handleBack} />

            <main className={pageStyles.content}>
                <article className={pageStyles.container}>
                    <Hero headline={t('titles.list')} hideOnMobile />

                    <CategoryForm ref={categoryFormRef} />

                    <DataWrapper
                        isLoading={isLoading}
                        error={error}
                        data={data}
                        emptyMessage={t('emptyMessageList')}
                    >
                        {data && (
                            <>
                                <CategoriesMobileView
                                    items={data}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                                <CategoriesTable
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
                description={t('modal:delete.descriptionCategory', {
                    type: category?.type,
                    name: category?.name,
                })}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsModalDeleteOpen(false)}
            />
        </article>
    )
}
