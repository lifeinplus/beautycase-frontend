import { type CheckboxItemProps } from '@/shared/components/forms/checkbox/item/CheckboxItem'

export const CheckboxItem = ({ id, label, register }: CheckboxItemProps) => (
    <div data-testid={`mocked-checkbox-item-${id}`}>
        <span>{label}</span>
        <input type="checkbox" {...register} />
    </div>
)
