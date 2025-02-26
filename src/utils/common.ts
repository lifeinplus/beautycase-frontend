export const appendToFormData = <T extends Record<string, any>>(
    data: T
): FormData => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
            formData.append(key, value)
        } else if (typeof value === 'object' && value !== null) {
            formData.append(key, JSON.stringify(value))
        } else if (value) {
            formData.append(key, value as string)
        }
    })

    return formData
}

export const cleanObject = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(cleanObject) as T
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj as Record<string, any>)
                .filter(
                    ([_, value]) =>
                        value !== undefined && value !== null && value !== ''
                )
                .map(([key, value]) => [key, cleanObject(value)])
        ) as T
    }
    return obj
}
