import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

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
import { Hero } from '@/shared/components/hero/Hero'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ModalDelete } from '@/shared/components/modals/delete/ModalDelete'
import { DataWrapper } from '@/shared/components/wrappers/DataWrapper'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { getTitleWithCount } from '@/shared/utils/ui/getTitleWithCount'
import { useToReferenceListsAction } from '../control-center/reference-lists/hooks/useToReferenceListsAction'

export const Categories = () => {
    const categoryFormRef = useRef<FormRef | null>(null)
    const { t } = useTranslation(['category', 'modal'])

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [category, setCategory] = useState<Category>()

    const dispatch = useAppDispatch()
    const { data = [], isLoading, error } = useGetAllCategoriesQuery()
    const [deleteCategoryById] = useDeleteCategoryByIdMutation()

    const backAction = useToReferenceListsAction()

    const handleDelete = async (data: Category) => {
        setCategory(data)
        setIsModalDeleteOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!category?._id) return

        try {
            await deleteCategoryById(category._id).unwrap()
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

    const title = getTitleWithCount(t('titles.list'), data.length)

    return (
        <article>
            <TopPanel title={title} onBack={backAction.onClick} />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
                    <Hero title={title} hideOnMobile />
                    <CategoryForm ref={categoryFormRef} />
                    <DataWrapper isLoading={isLoading} error={error}>
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
