import { useToMakeupBagListAction } from '@/pages/makeup-bags/list/hooks/useToMakeupBagListAction'
import { MakeupBagDetails } from '@/widgets/makeup-bag/details/MakeupBagDetails'

export const MakeupBagDetailsForBackstage = () => {
    const action = useToMakeupBagListAction()
    return <MakeupBagDetails onBack={action.onClick} />
}
