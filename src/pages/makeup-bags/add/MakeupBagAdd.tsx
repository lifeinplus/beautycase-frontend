import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks/hooks'
import { clearFormData } from '@/features/form/slice/formSlice'
import { useCreateMakeupBagMutation } from '@/features/makeup-bags/api/makeupBagsApi'
import { MakeupBagForm } from '@/features/makeup-bags/components/form/MakeupBagForm'
import type { MakeupBag } from '@/features/makeup-bags/types'
import { ROUTES } from '@/shared/config/routes'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'

export const MakeupBagAdd = () => {
    const navigate = useNavigate()
    const { t } = useTranslation('makeupBag')

    const dispatch = useAppDispatch()
    const [createMakeupBag] = useCreateMakeupBagMutation()

    const handleAddMakeupBag = async (makeupBag: MakeupBag) => {
        try {
            const response = await createMakeupBag(makeupBag).unwrap()
            dispatch(clearFormData())
            navigate(ROUTES.backstage.makeupBags.details(response.id))
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <MakeupBagForm title={t('titles.add')} onSubmit={handleAddMakeupBag} />
    )
}
