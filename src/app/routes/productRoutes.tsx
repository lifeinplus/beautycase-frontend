import { Route } from 'react-router-dom'

import { RequireRole } from '@/features/auth/components/RequireRole'
import { StoreLinkAddPage } from '@/features/stores/pages/StoreLinkAddPage'
import { ProductAddPage } from '@/pages/product/ProductAddPage'
import { ProductDetailsPage } from '@/pages/product/ProductDetailsPage'
import { ProductEditPage } from '@/pages/product/ProductEditPage'
import { ProductGalleryPage } from '@/pages/product/ProductGalleryPage'

export const productRoutes = [
    <Route key="products" path="/products">
        <Route path=":id" element={<ProductDetailsPage />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<ProductGalleryPage />} />
            <Route path="add" element={<ProductAddPage />} />
            <Route path="add/links" element={<StoreLinkAddPage />} />
            <Route path="edit/:id" element={<ProductEditPage />} />
            <Route path="edit/:id/links" element={<StoreLinkAddPage />} />
        </Route>
    </Route>,
]
