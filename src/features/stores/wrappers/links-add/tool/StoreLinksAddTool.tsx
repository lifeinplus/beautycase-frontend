import toast from 'react-hot-toast'

import { useUpdateToolStoreLinksMutation } from '@/features/tools/api/toolsApi'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { StoreLinksAdd } from '@/widgets/store/links-add/StoreLinksAdd'
import type { StoreLink } from '../../../types'

export const StoreLinksAddTool = () => {
    const [updateToolStoreLinks, { isLoading }] =
        useUpdateToolStoreLinksMutation()

    const onSave = async (id: string, storeLinks: StoreLink[]) => {
        try {
            await updateToolStoreLinks({
                id: id,
                data: { storeLinks },
            }).unwrap()
        } catch (error) {
            console.error(error)
            toast.error(getErrorMessage(error))
        }
    }

    return <StoreLinksAdd onSave={onSave} isSaving={isLoading} />
}
