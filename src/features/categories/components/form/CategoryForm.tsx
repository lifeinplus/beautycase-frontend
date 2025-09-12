import {
    ArrowDownCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { clearFormData, selectFormData } from '@/features/form/slice/formSlice'
import type { FormRef } from '@/features/form/types'
import commonStyles from '@/shared/components/common/common.module.css'
import { Button } from '@/shared/components/forms/button/Button'
import formStyles from '@/shared/components/forms/form.module.css'
import inputStyles from '@/shared/components/ui/input/Input.module.css'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import {
    useCreateCategoryMutation,
    useUpdateCategoryByIdMutation,
} from '../../api/categoriesApi'
import type { Category } from '../../types'
import { categorySchema } from '../../validations'

export const CategoryForm = forwardRef<FormRef | null>(({}, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { t } = useTranslation('category')

    useImperativeHandle(ref, () => ({
        focusInput: () => {
            inputRef.current?.focus()
        },
    }))

    const defaultValues: Partial<Category> = { name: '', type: '' }

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Category>({
        defaultValues,
        resolver: yupResolver(categorySchema),
    })

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData) as Category | undefined

    useEffect(() => {
        reset(formData)
    }, [formData, reset])

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful, reset])

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategoryById] = useUpdateCategoryByIdMutation()

    const handleAddCategory = async (data: Category) => {
        try {
            await createCategory(data).unwrap()
            dispatch(clearFormData())
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleUpdateCategory = async (data: Category) => {
        const { _id, ...category } = data

        try {
            await updateCategoryById({ id: _id!, category }).unwrap()
            dispatch(clearFormData())
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const { ref: refName, ...restName } = register('name')

    return (
        <form className="my-6 px-4 sm:px-0">
            <div className="flex gap-3">
                <div className="flex flex-grow flex-col">
                    <input
                        {...register('type')}
                        className={inputStyles.input}
                        placeholder={t('fields.type.label')}
                        type="text"
                    />
                    {errors.type && (
                        <p
                            className={classNames(
                                commonStyles.textDanger,
                                formStyles.error
                            )}
                        >
                            {t(errors.type.message || '')}
                        </p>
                    )}
                </div>

                <div className="flex flex-grow flex-col">
                    <input
                        {...restName}
                        className={inputStyles.input}
                        placeholder={t('fields.name.label')}
                        ref={(e) => {
                            refName(e)
                            inputRef.current = e
                        }}
                        type="text"
                    />

                    {errors.name && (
                        <p
                            className={classNames(
                                commonStyles.textDanger,
                                formStyles.error
                            )}
                        >
                            {t(errors.name.message || '')}
                        </p>
                    )}
                </div>

                {formData?._id ? (
                    <Button
                        aria-label={t('buttons.categoryEdit.ariaLabel')}
                        className="min-w-28 self-start"
                        onClick={handleSubmit(handleUpdateCategory)}
                        type="submit"
                        variant="warning"
                    >
                        <ArrowDownCircleIcon className="h-6 w-6" />
                    </Button>
                ) : (
                    <Button
                        aria-label={t('buttons.categoryAdd.ariaLabel')}
                        className="min-w-28 self-start"
                        onClick={handleSubmit(handleAddCategory)}
                        type="submit"
                        variant="success"
                    >
                        <PlusCircleIcon className="h-6 w-6" />
                    </Button>
                )}
            </div>
        </form>
    )
})
