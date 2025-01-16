export interface FieldConfig<T> {
    label: string
    name: keyof T
    options?: { text: string; value: string }[]
    path?: string
    required?: boolean
    rows?: number
    type:
        | 'button-products'
        | 'button-stages'
        | 'button-store-links'
        | 'button-tools'
        | 'select'
        | 'text'
        | 'textarea'
        | 'textarea-steps'
}
