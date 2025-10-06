export const transformAllFalse = (value: any) => {
    return value && Object.values(value).every((v) => v === false)
        ? undefined
        : value
}

export const transformEmpty = (value: any, originalValue: any) => {
    return originalValue === '' || originalValue === null ? undefined : value
}
