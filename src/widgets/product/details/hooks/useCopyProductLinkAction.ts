import { LinkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { NavBarAction } from '@/app/layout/hooks/types'
import { ROUTES } from '@/shared/config/routes'
import { Role } from '@/shared/model/role'

export const useCopyProductLinkAction = (): NavBarAction | null => {
    const { id } = useParams()
    const { t } = useTranslation('actions')

    if (!id) return null

    const publicUrl = `${window.location.origin}${ROUTES.products.root}/${id}`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicUrl)
            toast.success(t('copyLink.success'))
        } catch (err) {
            console.error('Failed to copy', err)
            toast.success(t('copyLink.error'))
        }
    }

    return {
        key: 'copy-product-link',
        auth: true,
        icon: LinkIcon,
        label: t('copyLink.label'),
        onClick: handleCopy,
        roles: [Role.MUA],
    }
}
