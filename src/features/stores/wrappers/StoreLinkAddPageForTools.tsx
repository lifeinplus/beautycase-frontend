import toast from 'react-hot-toast'

import { useUpdateToolStoreLinksMutation } from '@/features/tools/toolsApi'
import { StoreLinkAddPage } from '@/pages/store/StoreLinkAddPage'
import { getErrorMessage } from '@/shared/utils/errorUtils'
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

    return <StoreLinkAddPage onSave={onSave} />
}
