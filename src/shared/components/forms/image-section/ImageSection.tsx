import { Image } from '@/shared/components/ui/image/Image'

export interface ImageSectionProps {
    name?: string
    url?: string
}

export const ImageSection = ({ name, url }: ImageSectionProps) => (
    <section className="mx-auto mb-3 max-w-md">
        <div className="relative mx-auto aspect-4/5 w-full overflow-hidden">
            <Image alt={name} src={url} />
        </div>
    </section>
)
