import { PhotoIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
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
import { useUploadImageTempMutation } from '../../uploads/uploadsApiSlice'
import { ImagePreview } from './ImagePreview'
import { Label } from './Label'

export interface ImageUrlSectionProps<T extends FieldValues> {
    clearErrors: UseFormClearErrors<T>
    folder: 'products' | 'stages' | 'tools'
    label: string
    name: Path<T>
    register: UseFormRegisterReturn
    setValue: UseFormSetValue<T>
    description?: string
    error?: FieldError
    required?: boolean
    value?: string
}

export const ImageUrlSection = <T extends FieldValues>({
    clearErrors,
    folder,
    label,
    name,
    register,
    setValue,
    description,
    error,
    required = false,
    value = '',
}: ImageUrlSectionProps<T>) => {
    const [imageUrl, setImageUrl] = useState<string>()

    useEffect(() => {
        setImageUrl(value)
    }, [value])

    const [uploadImageTemp] = useUploadImageTempMutation()

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        try {
            const formData = new FormData()
            formData.append('folder', folder)
            formData.append('imageFile', file)

            const response = await uploadImageTemp(formData).unwrap()

            setImageUrl(response.imageUrl)
            setValue(name, response.imageUrl as PathValue<T, Path<T>>)
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

            {description && <p className="form-description">{description}</p>}

            {error && <p className="form-error">{error.message}</p>}

            {imageUrl && <ImagePreview url={imageUrl} />}
        </div>
    )
}
