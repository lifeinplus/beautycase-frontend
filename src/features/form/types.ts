export interface FieldConfig<T> {
    label: string
    name: keyof T
    onClick?: () => void
    options?: { text: string; value: string }[]
    required?: boolean
    rows?: number
    type: 'text' | 'textarea' | 'button' | 'select'
}
