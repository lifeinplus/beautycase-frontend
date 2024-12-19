function getVideoId(videoUrl: string) {
    const url = new URL(videoUrl)
    const videoId = url.searchParams.get('v')
    const pathName = url.pathname.split('/').pop()
    return videoId || pathName
}

function getValidYouTubeId(videoUrl: string) {
    const videoId = getVideoId(videoUrl)
    const pattern = /^[a-zA-Z0-9_-]{11}$/

    if (!videoId || !pattern.test(videoId)) {
        throw new Error('Invalid YouTube video ID')
    }

    return videoId
}

export const getYouTubeEmbedUrl = (videoUrl: string) => {
    const videoId = getValidYouTubeId(videoUrl)
    return `https://www.youtube.com/embed/${videoId}`
}

export const getYouTubeThumbnail = (videoUrl: string) => {
    const videoId = getValidYouTubeId(videoUrl)
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}
