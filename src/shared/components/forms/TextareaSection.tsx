import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

import commonStyles from '@/shared/components/common/common.module.css'
import { getYouTubeThumbnail } from '@/shared/utils/youtube'
import { ImagePreview } from './ImagePreview'
import { Label } from './Label'

export interface TextareaSectionProps {
    label: string
    register: UseFormRegisterReturn
    description?: string
    error?: string
    preview?: boolean
    required?: boolean
    rows?: number
    value?: string
}

export const TextareaSection = ({
    label,
    register,
    description,
    error,
    preview = false,
    required = false,
    rows,
    value = '',
}: TextareaSectionProps) => (
    <div>
        <Label required={required} text={label}>
            <textarea
                {...register}
                className={classNames(
                    'form-input',
                    'peer',
                    error && 'border-error'
                )}
                placeholder={label}
                rows={rows}
            />

            {preview && value && (
                <ImagePreview
                    url={
                        register.name === 'videoUrl'
                            ? getYouTubeThumbnail(value)
                            : value
                    }
                />
            )}
        </Label>

        {description && <p className="form-description">{description}</p>}

        {error && (
            <p className={classNames(commonStyles.textDanger, 'form-error')}>
                {error}
            </p>
        )}
    </div>
)
