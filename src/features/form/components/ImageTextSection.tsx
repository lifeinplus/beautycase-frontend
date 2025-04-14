import { PhotoIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent } from 'react'
import {
    type FieldError,
    type FieldValues,
    type Path,
    type PathValue,
    type UseFormClearErrors,
    type UseFormRegisterReturn,
    type UseFormSetValue,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { getErrorMessage } from '../../../utils/errorUtils'
import { useUploadImageTempMutation } from '../../uploads/uploadApiSlice'
import { ImagePreview } from './ImagePreview'
import { Label } from './Label'

export interface ImageTextSectionProps<T extends FieldValues> {
    clearErrors: UseFormClearErrors<T>
    folder: 'products' | 'questionnaires' | 'stages' | 'tools'
    label: string
    labelUrl: string
    name: Path<T>
    nameUrl: Path<T>
    register: UseFormRegisterReturn
    registerUrl: UseFormRegisterReturn
    setValue: UseFormSetValue<T>
    description?: string
    error?: FieldError
    required?: boolean
    value?: string
    valueUrl?: string
}

export const ImageTextSection = <T extends FieldValues>({
    clearErrors,
    folder,
    label,
    labelUrl,
    name,
    nameUrl,
    register,
    registerUrl,
    setValue,
    description,
    error,
    required = false,
    value = '',
    valueUrl = '',
}: ImageTextSectionProps<T>) => {
    const [uploadImageTemp] = useUploadImageTempMutation()

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        function fallbackText(value: string) {
            const text = '[приложено фото]'
            return value ? value : text
        }

        try {
            const formData = new FormData()
            formData.append('folder', folder)
            formData.append('imageFile', file)

            const response = await uploadImageTemp(formData).unwrap()

            setValue(name, fallbackText(value) as PathValue<T, Path<T>>)
            setValue(nameUrl, response.imageUrl as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <Label required={required} text={label} />

                <label>
                    <PhotoIcon className={classNames('h-6 w-6')} />

                    <input
                        accept="image/*,.heic"
                        className={classNames(
                            'form-input hidden',
                            error && 'border-error'
                        )}
                        onChange={handleUpload}
                        type="file"
                    />
                </label>
            </div>

            <textarea
                {...register}
                className={classNames(
                    'form-input',
                    'peer',
                    error && 'border-error'
                )}
                placeholder={label}
            />

            <textarea
                {...registerUrl}
                className={classNames(
                    'hidden',
                    'form-input',
                    'peer',
                    error && 'border-error'
                )}
                placeholder={labelUrl}
            />

            {description && <p className="form-description">{description}</p>}

            {error && <p className="form-error">{error.message}</p>}

            {valueUrl && <ImagePreview url={valueUrl} />}
        </div>
    )
}
