export const getTitleWithCount = (title: string, count?: number) =>
    [title, count ? `(${count})` : null].filter(Boolean).join(' ')
