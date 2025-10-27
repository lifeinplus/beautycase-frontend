import { Image } from '@/shared/components/ui/image/Image'
import { getEmbedUrl } from '@/shared/utils/youtube/embed-url/getEmbedUrl'

export interface VideoSectionProps {
    name?: string
    url?: string
}

export const VideoSection = ({ name, url }: VideoSectionProps) => {
    const embedUrl = url && getEmbedUrl(url)

    return (
        <section className="relative mb-6 aspect-video max-w-full overflow-hidden">
            {embedUrl ? (
                <iframe
                    className="absolute top-0 left-0 h-full w-full"
                    width="100%"
                    height="315"
                    src={embedUrl}
                    title={name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            ) : (
                <Image
                    alt={`${name} Thumbnail`}
                    src={import.meta.env.VITE_DEFAULT_THUMBNAIL_URL}
                />
            )}
        </section>
    )
}
