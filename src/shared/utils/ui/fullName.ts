export const fullName = (firstName?: string, lastName?: string) => {
    return `${firstName || '—'} ${lastName || '—'}`
}
