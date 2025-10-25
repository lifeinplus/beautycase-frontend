import { useToAccountAction } from '@/pages/account/hooks/useToAccountAction'
import { ToolDetails } from '@/widgets/tool/details/ToolDetails'

export const ToolDetailsForClient = () => {
    const action = useToAccountAction()
    return <ToolDetails onBack={action.onClick} />
}
