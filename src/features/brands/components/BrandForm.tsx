import {
    ArrowDownCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Button } from '../../form/components/Button'
import { getErrorMessage } from '../../../utils/errorUtils'
import { clearFormData, selectFormData } from '../../form/formSlice'
import type { FormRef } from '../../form/types'
import {
    useCreateBrandMutation,
    useUpdateBrandByIdMutation,
} from '../brandsApi'
import type { Brand } from '../types'
import { brandSchema } from '../validations'

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
        <form className="my-6 pe-4 ps-4 sm:px-0">
            <div className="flex gap-3">
                <input
                    {...restName}
                    className="form-input flex-grow"
                    placeholder={t('fields.name.label')}
                    ref={(e) => {
                        refName(e)
                        inputRef.current = e
                    }}
                    type="text"
                />

                {formData?._id ? (
                    <Button
                        className="min-w-28"
                        onClick={handleSubmit(handleUpdateBrand)}
                        type="submit"
                        variant="warning"
                    >
                        <ArrowDownCircleIcon className="h-6 w-6" />
                    </Button>
                ) : (
                    <Button
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
                <p className="form-error text-danger">
                    {t(errors.name.message || '')}
                </p>
            )}
        </form>
    )
})
