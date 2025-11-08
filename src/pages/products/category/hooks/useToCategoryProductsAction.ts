import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useGetProductByIdQuery } from '@/features/products/api/productsApi'
import { ROUTES } from '@/shared/config/routes'

export const useToCategoryProductsAction = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const { t } = useTranslation('navigation')

    const productsRoot = ROUTES.backstage.products.root
    const isProductDetailsPage = pathname.match(
        new RegExp(`^${productsRoot}/[a-f0-9]{24}$`)
    )

    const { data } = useGetProductByIdQuery(id!, {
        skip: !id || !isProductDetailsPage,
    })

    if (!id || !isProductDetailsPage) return null

    return {
        key: 'back',
        auth: true,
        className: 'hidden md:flex',
        icon: ArrowLeftIcon,
        label: t('actions.back'),
        onClick: () =>
            navigate(
                state?.prev ||
                    ROUTES.backstage.products.category(data?.category?.name!),
                {
                    replace: true,
                    state: { scrollId: id },
                }
            ),
    }
}
