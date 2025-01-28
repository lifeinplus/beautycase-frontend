export interface SelectOption {
    text: string
    value: string
}

export interface FieldConfig<T> {
    label: string
    name: keyof T
    type:
        | 'button-products'
        | 'button-stages'
        | 'button-store-links'
        | 'button-tools'
        | 'select'
        | 'text'
        | 'textarea'
        | 'textarea-steps'
    options?: SelectOption[]
    path?: string
    preview?: boolean
    required?: boolean
    rows?: number
}
