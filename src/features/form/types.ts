export interface FieldConfig<T> {
    label: string
    name: keyof T
    options?: { text: string; value: string }[]
    required?: boolean
    rows?: number
    type:
        | 'button-products'
        | 'button-stages'
        | 'select'
        | 'text'
        | 'textarea'
        | 'textarea-steps'
}
