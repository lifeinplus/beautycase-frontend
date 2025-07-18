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

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { clearFormData, selectFormData } from '@/features/form/formSlice'
import type { FormRef } from '@/features/form/types'
import commonStyles from '@/shared/components/common/common.module.css'
import { Button } from '@/shared/components/forms/Button'
import formStyles from '@/shared/components/forms/form.module.css'
import inputStyles from '@/shared/components/ui/Input.module.css'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import {
    useCreateStoreMutation,
    useUpdateStoreByIdMutation,
} from '../storesApi'
import type { Store } from '../types'
import { storeSchema } from '../validations'

export const StoreForm = forwardRef<FormRef | null>(({}, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { t } = useTranslation('store')

    useImperativeHandle(ref, () => ({
        focusInput: () => {
            inputRef.current?.focus()
        },
    }))

    const defaultValues: Store = { name: '' }

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Store>({
        defaultValues,
        resolver: yupResolver(storeSchema),
    })

    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormData) as Store | undefined

    useEffect(() => {
        reset(formData)
    }, [formData, reset])

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
        }
    }, [isSubmitSuccessful, reset])

    const [createStore] = useCreateStoreMutation()
    const [updateStoreById] = useUpdateStoreByIdMutation()

    const handleAddStore = async (data: Store) => {
        try {
            await createStore(data).unwrap()
            dispatch(clearFormData())
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleUpdateStore = async (data: Store) => {
        const { _id, ...store } = data

        try {
            await updateStoreById({ id: _id!, store }).unwrap()
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
                    className={classNames(inputStyles.input, 'flex-grow')}
                    placeholder={t('fields.name.label')}
                    ref={(e) => {
                        refName(e)
                        inputRef.current = e
                    }}
                    type="text"
                />

                {formData?._id ? (
                    <Button
                        aria-label={t('buttons.storeEdit.ariaLabel')}
                        className="min-w-28"
                        onClick={handleSubmit(handleUpdateStore)}
                        type="submit"
                        variant="warning"
                    >
                        <ArrowDownCircleIcon className="h-6 w-6" />
                    </Button>
                ) : (
                    <Button
                        aria-label={t('buttons.storeAdd.ariaLabel')}
                        className="min-w-28"
                        onClick={handleSubmit(handleAddStore)}
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
                        commonStyles.textDanger,
                        formStyles.error
                    )}
                >
                    {t(errors.name.message || '')}
                </p>
            )}
        </form>
    )
})
