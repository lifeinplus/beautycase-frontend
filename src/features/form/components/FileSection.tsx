import heic2any from 'heic2any'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { ImagePreview, Label } from '../../form'

interface FileSectionProps {
    control: any
    label: string
    name: string
    accept?: string
    description?: string
    required?: boolean
}

export const FileSection = ({
    control,
    label,
    name,
    accept = 'image/*,.heic',
    description,
    required = false,
}: FileSectionProps) => {
    const [fileUrl, setFileUrl] = useState<string>()

    const handleMakeupBagPhoto = async (file: File) => {
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
                return convertedFile
            } catch (error) {
                console.error('Failed to convert HEIC file:', error)
                return
            }
        } else {
            setFileUrl(URL.createObjectURL(file))
            return file
        }
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, ...field } }) => (
                <div>
                    <Label text={label} />

                    <input
                        {...field}
                        type="file"
                        accept={accept}
                        required={required}
                        className="form-input"
                        onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                                const processedFile =
                                    await handleMakeupBagPhoto(file)
                                onChange(processedFile)
                            }
                        }}
                    />

                    {description && (
                        <p className="form-description">{description}</p>
                    )}

                    {fileUrl && <ImagePreview url={fileUrl} />}
                </div>
            )}
        />
    )
}
