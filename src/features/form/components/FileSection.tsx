import heic2any from 'heic2any'
import { ChangeEvent, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import toast from 'react-hot-toast'

import { getErrorMessage } from '../../../utils'
import { ImagePreview, Label } from '../../form'

interface FileSectionProps {
    label: string
    register: UseFormRegisterReturn
    description?: string
    required?: boolean
}

export const FileSection = ({
    label,
    register,
    description,
    required = false,
}: FileSectionProps) => {
    const [fileUrl, setFileUrl] = useState<string>()

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
            try {
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: 'image/jpeg',
                })

                const convertedFile = new File(
                    [convertedBlob as Blob],
                    file.name.replace('.heic', '.jpeg'),
                    { type: 'image/jpeg' }
                )

                setFileUrl(URL.createObjectURL(convertedFile))
            } catch (error) {
                console.error(error)
                toast.error(getErrorMessage(error))
            }
        } else {
            setFileUrl(URL.createObjectURL(file))
        }
    }

    return (
        <div>
            <Label text={label} />

            <input
                {...register}
                accept="image/*,.heic"
                className="form-input"
                onChange={handleChange}
                required={required}
                type="file"
            />

            {description && <p className="form-description">{description}</p>}

            {fileUrl && <ImagePreview url={fileUrl} />}
        </div>
    )
}
