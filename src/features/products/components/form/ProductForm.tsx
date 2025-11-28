import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '@/app/hooks/hooks'
import { useGetAllBrandsQuery } from '@/features/brands/api/brandsApi'
import { useGetProductCategoriesQuery } from '@/features/categories/api/categoriesApi'
import { selectFormData } from '@/features/form/slice/formSlice'
import type { SelectOption } from '@/features/form/types'
import { ImageFilesSection } from '@/shared/components/forms/image/files-section/ImageFilesSection'
import { InputSection } from '@/shared/components/forms/input/section/InputSection'
import { SelectSection } from '@/shared/components/forms/select/section/SelectSection'
import { TextareaSection } from '@/shared/components/forms/textarea/section/TextareaSection'
import { TitleSection } from '@/shared/components/forms/title-section/TitleSection'
import { TopPanel } from '@/shared/components/layout/top-panel/TopPanel'
import { ButtonSubmit } from '@/shared/components/ui/button-submit/ButtonSubmit'
import type { Product } from '../../types'
import { productSchema } from '../../validations'

export interface ProductFormProps {
    title: string
    onSubmit: (data: Product) => void
    isSaving?: boolean
}

export const ProductForm = ({
    title,
    onSubmit,
    isSaving = false,
}: ProductFormProps) => {
    const { t } = useTranslation('product')

    const {
        clearErrors,
        register,
        reset,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Product>({
        resolver: yupResolver(productSchema),
    })

    const formData: Product = useAppSelector(selectFormData)

    useEffect(() => {
        reset(formData)
    }, [formData])

    const { data: brands } = useGetAllBrandsQuery()
    const { data: categories } = useGetProductCategoriesQuery()

    const brandOptions: SelectOption[] | undefined = brands?.map((b) => ({
        text: b.name,
        value: b._id!,
    }))

    const categoryOptions: SelectOption[] | undefined = categories?.map(
        (c) => ({
            text: t(`categories.${c.name}`),
            value: c._id!,
        })
    )

    return (
        <article>
            <TopPanel title={title} />

            <main className="pb-safe-bottom md:ms-navbar lg:ms-navbar-wide flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 md:max-w-2xl md:px-4 md:pt-6">
                    <TitleSection title={title} hideOnMobile />

                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <article className="px-3">
                            <SelectSection
                                error={t(errors.brandId?.message || '')}
                                label={t('fields.brand.label')}
                                options={brandOptions}
                                register={register('brandId')}
                                required={true}
                                value={watch('brandId')}
                            />

                            <SelectSection
                                error={t(errors.categoryId?.message || '')}
                                label={t('fields.category.label')}
                                options={categoryOptions}
                                register={register('categoryId')}
                                required={true}
                                value={watch('categoryId')}
                            />

                            <TextareaSection
                                error={t(errors.name?.message || '')}
                                label={t('fields.name.label')}
                                register={register('name')}
                                required={true}
                                value={watch('name')}
                            />

                            <ImageFilesSection
                                clearErrors={clearErrors}
                                folder="products"
                                error={t(errors.imageIds?.message || '')}
                                label={t('fields.imageIds.label')}
                                name={'imageIds'}
                                required={true}
                                setValue={setValue}
                                value={watch('imageIds')}
                            />

                            <InputSection
                                error={t(errors.shade?.message || '')}
                                label={t('fields.shade.label')}
                                register={register('shade')}
                                type={'text'}
                            />

                            <TextareaSection
                                error={t(errors.comment?.message || '')}
                                label={t('fields.comment.label')}
                                register={register('comment')}
                                required={true}
                                value={watch('comment')}
                            />
                        </article>

                        <section
                            className={classNames(
                                'border-t border-gray-300 px-3 pt-6',
                                'md:flex md:justify-end md:border-0 md:pt-0',
                                'dark:border-gray-700'
                            )}
                        >
                            <ButtonSubmit
                                isLoading={isSaving}
                                label={
                                    isSaving
                                        ? t('actions:saving')
                                        : t('actions:save')
                                }
                            />
                        </section>
                    </form>
                </article>
            </main>
        </article>
    )
}
