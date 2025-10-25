import { useToAccountAction } from '@/pages/account/hooks/useToAccountAction'
import { MakeupBagDetails } from '@/widgets/makeup-bag/details/MakeupBagDetails'

export const MakeupBagDetailsForClient = () => {
    const action = useToAccountAction()
    return <MakeupBagDetails onBack={action.onClick} />
}
