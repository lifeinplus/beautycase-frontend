export const generatePdfFilename = (category: string, client: string) => {
    return `${category.replace(/\s+/g, '-')}-${client}.pdf`
}
