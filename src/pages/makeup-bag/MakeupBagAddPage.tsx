import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { clearFormData } from '@/features/form/formSlice'
import { MakeupBagForm } from '../../features/makeupBags/components/MakeupBagForm'
import { useCreateMakeupBagMutation } from '../../features/makeupBags/makeupBagsApi'
import type { MakeupBag } from '../../features/makeupBags/types'

export const MakeupBagAddPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('makeupBag')

    const dispatch = useAppDispatch()
    const [createMakeupBag] = useCreateMakeupBagMutation()

    const handleAddMakeupBag = async (makeupBag: MakeupBag) => {
        try {
            const response = await createMakeupBag(makeupBag).unwrap()
            dispatch(clearFormData())
            navigate(`/makeup_bags/${response.id}`)
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <MakeupBagForm title={t('titles.add')} onSubmit={handleAddMakeupBag} />
    )
}
