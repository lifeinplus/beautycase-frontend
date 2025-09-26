import i18n from '@/lib/i18n'

import { isApiErrorWithCode, isFetchBaseQueryError } from './guards'

export function getErrorMessage(err: unknown): string {
    if (isApiErrorWithCode(err)) {
        const { code, details } = err.data

        let result = i18n.t(`errors:${code}`, code)

        if (code === 'PRODUCT_IN_USE' && details) {
            const lessons =
                (details as any).lessons?.map((l: any) => l.title.trim()) ?? []
            const stages =
                (details as any).stages?.map((s: any) => s.title.trim()) ?? []

            if (lessons.length || stages.length) {
                result += ` (${[...lessons, ...stages].join(', ')})`
            }
        }

        if (code === 'TOOL_IN_USE' && details) {
            const makeupBags =
                (details as any).makeupBags?.map((b: any) =>
                    i18n.t(`makeupBag:categories.${b.name}.full`)
                ) ?? []

            if (makeupBags.length) {
                result += ` (${makeupBags.join(', ')})`
            }
        }

        return result
    }

    if (isFetchBaseQueryError(err)) {
        return 'error' in err ? err.error : JSON.stringify(err.data)
    }

    return i18n.t('errors:UNKNOWN_ERROR')
}
