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
