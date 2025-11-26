import { getValidYouTubeId } from '../helpers/getValidYouTubeId'

export const getThumbnail = (videoUrl: string): string => {
    try {
        const id = getValidYouTubeId(videoUrl)
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    } catch (error) {
        console.error(error)
    }

    return import.meta.env.VITE_DEFAULT_PRODUCT_URL
}
