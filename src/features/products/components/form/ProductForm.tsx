import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks/hooks'
import { useGetAllBrandsQuery } from '@/features/brands/api/brandsApi'
import { useGetProductCategoriesQuery } from '@/features/categories/api/categoriesApi'
import { selectFormData } from '@/features/form/slice/formSlice'
import type { SelectOption } from '@/features/form/types'
import { ImageUrlSection } from '@/shared/components/forms/image/url-section/ImageUrlSection'
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
    const navigate = useNavigate()
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

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <article>
            <TopPanel title={title} onBack={handleBack} />

            <main className="pb-safe-bottom sm:ms-navbar lg:ms-navbar-open flex flex-col items-center justify-center">
                <article className="mx-auto w-full pb-6 sm:max-w-lg sm:pt-6 md:max-w-2xl md:px-4">
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

                            <ImageUrlSection
                                clearErrors={clearErrors}
                                folder="products"
                                error={t(errors.imageUrl?.message || '')}
                                label={t('fields.imageUrl.label')}
                                name={'imageUrl'}
                                register={register('imageUrl')}
                                required={true}
                                setValue={setValue}
                                value={watch('imageUrl')}
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
                                'sm:flex sm:justify-end sm:border-0 sm:pt-0',
                                'dark:border-gray-700'
                            )}
                        >
                            <ButtonSubmit
                                isLoading={isSaving}
                                label={
                                    isSaving
                                        ? t('navigation:actions.saving')
                                        : t('navigation:actions.save')
                                }
                            />
                        </section>
                    </form>
                </article>
            </main>
        </article>
    )
}
