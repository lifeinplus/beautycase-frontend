import { Image } from '@/shared/components/ui/image/Image'

export interface VideoPreviewProps {
    url: string
}

export const VideoPreview = ({ url }: VideoPreviewProps) => (
    <div className="relative mx-auto mt-5 aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 p-1 peer-focus-within:border-black dark:border-neutral-700 peer-focus-within:dark:border-white">
        <Image
            alt="Preview"
            className="h-full w-full rounded-xl object-cover sm:rounded"
            src={url}
        />
    </div>
)
