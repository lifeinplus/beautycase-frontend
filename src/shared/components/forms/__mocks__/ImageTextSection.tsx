import { FieldValues } from 'react-hook-form'
import { ImageTextSectionProps } from '../ImageTextSection'

export const ImageTextSection = <T extends FieldValues>({
    label,
    register,
}: ImageTextSectionProps<T>) => (
    <textarea
        {...register}
        data-testid="mocked-image-text-section"
        placeholder={label}
    />
)
