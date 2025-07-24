import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { StoreLinksAddForProduct } from '@/features/stores/wrappers/StoreLinksAddForProduct'
import { ProductAdd } from '@/pages/product/add/ProductAdd'
import { ProductDetails } from '@/pages/product/details/ProductDetails'
import { ProductEdit } from '@/pages/product/edit/ProductEdit'
import { ProductGallery } from '@/pages/product/gallery/ProductGallery'
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
