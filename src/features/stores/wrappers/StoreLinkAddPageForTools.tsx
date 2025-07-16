import toast from 'react-hot-toast'

import { useUpdateToolStoreLinksMutation } from '@/features/tools/toolsApi'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { StoreLinksAdd } from '@/widgets/store/store-links-add/StoreLinksAdd'
import type { StoreLink } from '../types'

export const StoreLinkAddPageForTools = () => {
    const [updateToolStoreLinks] = useUpdateToolStoreLinksMutation()

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

    return <StoreLinksAdd onSave={onSave} />
}
