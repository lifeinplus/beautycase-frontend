export const generatePdfFilename = (category: string, client: string) =>
    `${category.replace(/\s+/g, '-')}-${client}.pdf`
