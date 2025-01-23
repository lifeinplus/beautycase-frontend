export const appendToFormData = <T extends Record<string, any>>(
    data: T
): FormData => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
            Array.from(value).forEach((file) => formData.append(key, file))
        } else if (value instanceof File) {
            formData.append(key, value)
        } else if (typeof value === 'object' && value !== null) {
            formData.append(key, JSON.stringify(value))
        } else {
            formData.append(key, value as string)
        }
    })

    return formData
}
