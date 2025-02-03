export const appendToFormData = <T extends Record<string, any>>(
    data: T
): FormData => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        console.log('appendToFormData', 111, key)
        console.log('appendToFormData', 222, value)
        if (value instanceof FileList) {
            console.log('appendToFormData', 333)
            Array.from(value).forEach((file) => formData.append(key, file))
        } else if (value instanceof File) {
            console.log('appendToFormData', 444)
            formData.append(key, value)
        } else if (typeof value === 'object' && value !== null) {
            console.log('appendToFormData', 555)
            formData.append(key, JSON.stringify(value))
        } else if (value) {
            console.log('appendToFormData', 666)
            formData.append(key, value as string)
        }
    })

    return formData
}
