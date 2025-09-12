import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { StoreLinksAddForProduct } from '@/features/stores/wrappers/links-add/product/StoreLinksAddForProduct'
import { ProductAdd } from '@/pages/products/add/ProductAdd'
import { CategoryProducts } from '@/pages/products/category/CategoryProducts'
import { ProductDetails } from '@/pages/products/details/ProductDetails'
import { ProductEdit } from '@/pages/products/edit/ProductEdit'
import { ProductGallery } from '@/pages/products/gallery/ProductGallery'

export const productRoutes = [
    <Route key="products" path="/products" element={<AppLayout />}>
        <Route path=":id" element={<ProductDetails />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<ProductGallery />} />
            <Route path=":id/edit" element={<ProductEdit />} />
            <Route path=":id/links" element={<StoreLinksAddForProduct />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path="category/:category" element={<CategoryProducts />} />
        </Route>
    </Route>,
]
