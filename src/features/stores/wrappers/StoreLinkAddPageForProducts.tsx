import toast from 'react-hot-toast'

import { useUpdateProductStoreLinksMutation } from '@/features/products/productsApi'
import { StoreLinkAddPage } from '@/pages/store/StoreLinkAddPage'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import type { StoreLink } from '../types'

export const StoreLinkAddPageForProducts = () => {
    const [updateProductStoreLinks] = useUpdateProductStoreLinksMutation()

    const onSave = async (id: string, storeLinks: StoreLink[]) => {
        try {
            await updateProductStoreLinks({
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
