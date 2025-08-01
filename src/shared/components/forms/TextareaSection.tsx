import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

import commonStyles from '@/shared/components/common/common.module.css'
import formStyles from '@/shared/components/forms/form.module.css'
import inputStyles from '@/shared/components/ui/Input.module.css'
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
                    inputStyles.input,
                    'peer',
                    error && formStyles.borderError
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

        {description && <p className={formStyles.description}>{description}</p>}

        {error && (
            <p
                className={classNames(
                    commonStyles.textDanger,
                    formStyles.error
                )}
            >
                {error}
            </p>
        )}
    </div>
)
