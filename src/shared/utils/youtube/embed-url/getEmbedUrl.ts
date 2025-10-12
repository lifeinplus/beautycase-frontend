import { getValidYouTubeId } from '../helpers/getValidYouTubeId'

export const getEmbedUrl = (videoUrl: string) => {
    try {
        const id = getValidYouTubeId(videoUrl)
        return `https://www.youtube.com/embed/${id}`
    } catch (error) {
        console.error(error)
    }
}
