import { format } from 'date-fns'

export const formatDate = (date: string | undefined, formatStr: string) => {
    if (!date) return '—'
    const parsedDate = new Date(date)
    return isNaN(parsedDate.getTime()) ? '—' : format(parsedDate, formatStr)
}
