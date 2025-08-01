import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { StoreLinksAddForProduct } from '@/features/stores/wrappers/StoreLinksAddForProduct'
import { ProductAdd } from '@/pages/products/add/ProductAdd'
import { ProductDetails } from '@/pages/products/details/ProductDetails'
import { ProductEdit } from '@/pages/products/edit/ProductEdit'
import { ProductGallery } from '@/pages/products/gallery/ProductGallery'
import { Layout } from '@/shared/components/layout/Layout'

export const productRoutes = [
    <Route key="products" path="/products">
        <Route element={<Layout />}>
            <Route path=":id" element={<ProductDetails />} />
            <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
                <Route index element={<ProductGallery />} />
                <Route path=":id/links" element={<StoreLinksAddForProduct />} />
                <Route path="add" element={<ProductAdd />} />
                <Route path="edit/:id" element={<ProductEdit />} />
            </Route>
        </Route>
    </Route>,
]
