import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import type {
    FieldValues,
    Path,
    PathValue,
    UseFormClearErrors,
    UseFormSetValue,
} from 'react-hook-form'
import toast from 'react-hot-toast'

import config from '@/app/config/config'
import {
    useDeleteImageMutation,
    useUploadTempImageMutation,
} from '@/features/uploads/api/uploadsApi'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { Label } from '../../label/Label'
import { ImagePreview } from '../../preview/image/ImagePreview'
import { ImageUploadPlaceholder } from '../ui/ImageUploadPlaceholder'

export interface ImageFileSectionProps<T extends FieldValues> {
    clearErrors: UseFormClearErrors<T>
    defaultImageId?: string
    folder: 'products' | 'stages' | 'tools'
    label: string
    name: Path<T>
    setValue: UseFormSetValue<T>
    error?: string
    required?: boolean
    value?: string
}

export const ImageFileSection = <T extends FieldValues>({
    clearErrors,
    defaultImageId = config.cloudinary.defaultProductId,
    folder,
    label,
    name,
    setValue,
    error,
    required = false,
    value,
}: ImageFileSectionProps<T>) => {
    const [imageId, setImageId] = useState<string | null>(null)

    useEffect(() => {
        if (value) {
            setImageId(value)
        }
    }, [value])

    const [uploadTempImage, { isLoading: isUploading }] =
        useUploadTempImageMutation()

    const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation()

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        try {
            const formData = new FormData()
            formData.append('folder', folder)
            formData.append('imageFile', file)

            const response = await uploadTempImage(formData).unwrap()

            setImageId(response.imageId)
            setValue(name, response.imageId as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error('Image upload failed', error)
            toast.error(getErrorMessage(error))
        }
    }

    const handleDelete = async (imageId: string) => {
        try {
            await deleteImage(imageId).unwrap()
            setImageId(null)
            setValue(name, null as PathValue<T, Path<T>>)
            clearErrors(name)
        } catch (error) {
            console.error('Image upload failed', error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div>
            <div
                className={classNames(
                    'flex justify-between',
                    imageId ? 'flex-row items-center' : 'flex-col'
                )}
            >
                <Label required={required} text={label} />

                {!imageId && (
                    <ImageUploadPlaceholder
                        isUploading={isUploading}
                        onUpload={handleUpload}
                        error={error}
                    />
                )}
            </div>

            <div className="relative space-y-5">
                {error && (
                    <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                        {error}
                    </p>
                )}

                {imageId && (
                    <ImagePreview
                        key={imageId}
                        imageId={imageId}
                        defaultImageId={defaultImageId}
                        onDelete={() => handleDelete(imageId)}
                        isLoading={isDeleting}
                    />
                )}
            </div>
        </div>
    )
}
