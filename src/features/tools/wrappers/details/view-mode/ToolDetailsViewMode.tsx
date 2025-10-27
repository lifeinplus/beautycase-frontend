import { useToHomeAction } from '@/pages/home/hooks/useToHomeAction'
import { ToolDetails } from '@/widgets/tool/details/ToolDetails'

export const ToolDetailsViewMode = () => {
    const action = useToHomeAction()
    return <ToolDetails onBack={action.onClick} viewMode />
}
