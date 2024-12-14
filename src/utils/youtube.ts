export const getYouTubeThumbnail = (videoUrl: string) => {
    const videoId = new URL(videoUrl).searchParams.get('v')
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}
