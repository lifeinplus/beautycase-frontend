import heic2any from 'heic2any'
import { useState } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import toast from 'react-hot-toast'

import { getErrorMessage } from '../../../utils'
import { ImagePreview, Label } from '../../form'
import { type Questionnaire } from '../../questionnaires'

interface FileSectionProps {
    control: Control<Questionnaire, any>
    label: string
    name: keyof Questionnaire
    description?: string
    error?: FieldError
    required?: boolean
}

export const FileSection = ({
    control,
    label,
    name,
    description,
    error,
    required = false,
}: FileSectionProps) => {
    const [fileUrl, setFileUrl] = useState<string>()

    const handlePreview = async (file: File) => {
        let convertedFile

        if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
            try {
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: 'image/jpeg',
                })

                convertedFile = new File(
                    [convertedBlob as Blob],
                    file.name.replace('.heic', '.jpeg'),
                    { type: 'image/jpeg' }
                )
            } catch (error) {
                console.error(error)
                toast.error(getErrorMessage(error))
            }
        }

        setFileUrl(URL.createObjectURL(convertedFile || file))
    }

    return (
        <div>
            <Label text={label} />

            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, ...field } }) => (
                    <input
                        {...field}
                        accept="image/*,.heic"
                        className={`form-input ${error ? 'text-rose-500 dark:text-rose-400' : ''}`}
                        onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                                onChange(file)
                                handlePreview(file)
                            }
                        }}
                        required={required}
                        type="file"
                    />
                )}
            />

            {description && <p className="form-description">{description}</p>}

            {error && <p className="form-error">{error.message}</p>}

            {fileUrl && <ImagePreview url={fileUrl} />}
        </div>
    )
}
