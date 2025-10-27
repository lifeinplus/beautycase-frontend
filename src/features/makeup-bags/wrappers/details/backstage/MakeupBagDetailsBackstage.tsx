import { useToMakeupBagListAction } from '@/pages/makeup-bags/list/hooks/useToMakeupBagListAction'
import { MakeupBagDetails } from '@/widgets/makeup-bag/details/MakeupBagDetails'

export const MakeupBagDetailsBackstage = () => {
    const action = useToMakeupBagListAction()
    return <MakeupBagDetails onBack={action.onClick} />
}
