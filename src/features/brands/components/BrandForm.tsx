import {
    ArrowDownCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { Button } from '../../../components/ui/Button'
import { getErrorMessage } from '../../../utils'
import { clearFormData, selectFormData } from '../../form'
import {
    type Brand,
    brandSchema,
    useCreateBrandMutation,
    useUpdateBrandMutation,
} from '../../brands'

export const BrandForm = () => {
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
    const formData = useAppSelector(selectFormData) as Brand

    useEffect(() => {
        reset(formData)
    }, [formData, reset])

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful, reset])

    const [createBrand] = useCreateBrandMutation()
    const [updateBrand] = useUpdateBrandMutation()

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
        try {
            await updateBrand(data).unwrap()
            dispatch(clearFormData())
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <form className="my-6 pe-4 ps-4 sm:px-0">
            <div className="flex gap-3">
                <input
                    {...register('name')}
                    className="form-input flex-grow"
                    placeholder="Бренд"
                    type="text"
                />

                {formData._id ? (
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

            {errors.name && <p className="form-error">{errors.name.message}</p>}
        </form>
    )
}
