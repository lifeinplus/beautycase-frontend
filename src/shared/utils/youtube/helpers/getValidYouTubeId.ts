function extractYouTubeId(url?: string) {
    const match = url?.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    )
    return match ? match[1] : null
}

export function getValidYouTubeId(url?: string) {
    const videoId = extractYouTubeId(url)
    const pattern = /^[a-zA-Z0-9_-]{11}$/

    if (!videoId || !pattern.test(videoId)) {
        throw new Error('Invalid YouTube video ID')
    }

    return videoId
}
