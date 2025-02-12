import { PhotoIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import {
    Path,
    UseFormClearErrors,
    UseFormSetValue,
    type FieldError,
    type UseFormRegisterReturn,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import { getErrorMessage } from '../../../utils'
import { useUploadFileMutation, type Product } from '../../products'
import { ImagePreview } from './ImagePreview'
import { Label } from './Label'

interface ImageUrlSectionProps {
    clearErrors: UseFormClearErrors<Product>
    label: string
    name: Path<Product>
    register: UseFormRegisterReturn
    setValue: UseFormSetValue<Product>
    description?: string
    error?: FieldError
    required?: boolean
    value?: string
}

export const ImageUrlSection = ({
    clearErrors,
    label,
    name,
    register,
    setValue,
    description,
    error,
    required = false,
    value = '',
}: ImageUrlSectionProps) => {
    const [imageUrl, setImageUrl] = useState<string>()

    useEffect(() => {
        setImageUrl(value)
    }, [value])

    const [uploadFile] = useUploadFileMutation()

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        try {
            const formData = new FormData()
            formData.append('imageFile', file)

            const response = await uploadFile(formData).unwrap()

            setImageUrl(response.imageUrl)
            setValue(name, response.imageUrl)
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
