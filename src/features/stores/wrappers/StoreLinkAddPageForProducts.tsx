import toast from 'react-hot-toast'

import { useUpdateProductStoreLinksMutation } from '@/features/products/productsApi'
import { getErrorMessage } from '@/shared/utils/errorUtils'
import { StoreLinksAdd } from '@/widgets/store/store-links-add/StoreLinksAdd'
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

    return <StoreLinksAdd onSave={onSave} />
}
