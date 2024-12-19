function getVideoId(videoUrl: string) {
    const url = new URL(videoUrl)
    const videoId = url.searchParams.get('v')
    const pathName = url.pathname.split('/').pop()
    return videoId || pathName
}

export const getYouTubeEmbedUrl = (videoUrl: string) => {
    const videoId = getVideoId(videoUrl)
    return `https://www.youtube.com/embed/${videoId}`
}

export const getYouTubeThumbnail = (videoUrl: string) => {
    const videoId = getVideoId(videoUrl)
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}
