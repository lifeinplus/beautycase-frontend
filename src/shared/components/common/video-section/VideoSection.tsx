import { Image } from '@/shared/components/ui/image/Image'
import { getEmbedUrl } from '@/shared/utils/youtube/getEmbedUrl'
import styles from './VideoSection.module.css'

export interface VideoSectionProps {
    name?: string
    url?: string
}

export const VideoSection = ({ name, url }: VideoSectionProps) => {
    const embedUrl = url && getEmbedUrl(url)

    return (
        <section className={styles.container}>
            {embedUrl ? (
                <iframe
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
