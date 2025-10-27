import toast from 'react-hot-toast'

import { useUpdateProductStoreLinksMutation } from '@/features/products/api/productsApi'
import { getErrorMessage } from '@/shared/utils/error/getErrorMessage'
import { StoreLinksAdd } from '@/widgets/store/links-add/StoreLinksAdd'
import type { StoreLink } from '../../../types'

export const StoreLinksAddProduct = () => {
    const [updateProductStoreLinks, { isLoading }] =
        useUpdateProductStoreLinksMutation()

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

    return <StoreLinksAdd onSave={onSave} isSaving={isLoading} />
}
