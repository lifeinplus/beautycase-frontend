export const getFullName = (firstName?: string, lastName?: string) => {
    return `${firstName || '—'} ${lastName || '—'}`
}
