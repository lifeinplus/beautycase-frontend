export interface FieldConfig<T> {
    label: string
    name: keyof T
    type: 'button-navigate' | 'imageUrl' | 'select' | 'text' | 'textarea'
    options?: SelectOption[]
    path?: string
    preview?: boolean
    required?: boolean
    rows?: number
}

export interface FormRef {
    focusInput: () => void
}

export interface SelectOption {
    text: string
    value: string
}
