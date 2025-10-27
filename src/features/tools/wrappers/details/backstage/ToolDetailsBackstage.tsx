import { useToToolGalleryAction } from '@/pages/tools/gallery/hooks/useToToolGalleryAction'
import { ToolDetails } from '@/widgets/tool/details/ToolDetails'

export const ToolDetailsBackstage = () => {
    const action = useToToolGalleryAction()
    return <ToolDetails onBack={action?.onClick} />
}
