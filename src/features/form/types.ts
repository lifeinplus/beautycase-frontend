export interface FieldConfig<T> {
    label: string
    name: keyof T
    onClick?: () => void
    required?: boolean
    rows?: number
    type: 'text' | 'textarea' | 'button'
}
