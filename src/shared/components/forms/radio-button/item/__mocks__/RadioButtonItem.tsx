import { type RadioButtonItemProps } from '../RadioButtonItem'

export const RadioButtonItem = ({
    id,
    label,
    register,
    value,
}: RadioButtonItemProps) => {
    return (
        <div data-testid={`mocked-radio-item-${id}`}>
            <label>{label}</label>
            <input {...register} readOnly value={value} />
        </div>
    )
}
