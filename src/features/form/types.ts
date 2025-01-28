export interface SelectOption {
    text: string
    value: string
}

export interface FieldConfig<T> {
    label: string
    name: keyof T
    type:
        | 'button-navigate'
        | 'button-stages'
        | 'button-tools'
        | 'select'
        | 'text'
        | 'textarea'
    options?: SelectOption[]
    path?: string
    preview?: boolean
    required?: boolean
    rows?: number
}
