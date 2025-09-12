function extractYouTubeId(url?: string) {
    const match = url?.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    )
    return match ? match[1] : null
}

function getValidYouTubeId(url?: string) {
    const videoId = extractYouTubeId(url)
    const pattern = /^[a-zA-Z0-9_-]{11}$/

    if (!videoId || !pattern.test(videoId)) {
        throw new Error('Invalid YouTube video ID')
    }

    return videoId
}

export const getEmbedUrl = (videoUrl: string) => {
    try {
        const id = getValidYouTubeId(videoUrl)
        return `https://www.youtube.com/embed/${id}`
    } catch (error) {
        console.error(error)
    }
}
