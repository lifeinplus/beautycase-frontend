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
import { Button } from '@/shared/components/forms/button/Button'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import {
    useCreateBrandMutation,
    useUpdateBrandByIdMutation,
} from '../../api/brandsApi'
import type { Brand } from '../../types'
import { brandSchema } from '../../validations'

export const BrandForm = forwardRef<FormRef | null>(({}, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { t } = useTranslation('brand')

    useImperativeHandle(ref, () => ({
        focusInput: () => {
            inputRef.current?.focus()
        },
    }))

    const defaultValues: Brand = { name: '' }

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Brand>({
        defaultValues,
        resolver: yupResolver(brandSchema),
    })

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData) as Brand | undefined

    useEffect(() => {
        reset(formData)
    }, [formData, reset])

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful, reset])

    const [createBrand] = useCreateBrandMutation()
    const [updateBrandById] = useUpdateBrandByIdMutation()

    const handleAddBrand = async (data: Brand) => {
        try {
            await createBrand(data).unwrap()
            dispatch(clearFormData())
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleUpdateBrand = async (data: Brand) => {
        const { _id, ...brand } = data

        try {
            await updateBrandById({ id: _id!, brand }).unwrap()
            dispatch(clearFormData())
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const { ref: refName, ...restName } = register('name')

    return (
        <form className="my-6 ps-4 pe-4 sm:px-0">
            <div className="flex gap-3">
                <input
                    {...restName}
                    className={classNames(
                        'block w-full grow rounded-xl px-4 py-2.5 focus:outline-none',
                        'bg-white placeholder-neutral-500',
                        'border border-neutral-200 focus:border-black',
                        'dark:border-neutral-700 dark:bg-black dark:placeholder-neutral-600 dark:focus:border-white'
                    )}
                    placeholder={t('fields.name.label')}
                    ref={(e) => {
                        refName(e)
                        inputRef.current = e
                    }}
                    type="text"
                />

                {formData?._id ? (
                    <Button
                        aria-label={t('buttons.brandEdit.ariaLabel')}
                        className="min-w-28"
                        onClick={handleSubmit(handleUpdateBrand)}
                        type="submit"
                        variant="warning"
                    >
                        <ArrowDownCircleIcon className="h-6 w-6" />
                    </Button>
                ) : (
                    <Button
                        aria-label={t('buttons.brandAdd.ariaLabel')}
                        className="min-w-28"
                        onClick={handleSubmit(handleAddBrand)}
                        type="submit"
                        variant="success"
                    >
                        <PlusCircleIcon className="h-6 w-6" />
                    </Button>
                )}
            </div>

            {errors.name && (
                <p
                    className={classNames(
                        'text-rose-500 dark:text-rose-400',
                        'mt-2 text-sm'
                    )}
                >
                    {t(errors.name.message || '')}
                </p>
            )}
        </form>
    )
})
