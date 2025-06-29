import { Route } from 'react-router-dom'

import { RequireRole } from '../features/auth/components/RequireRole'
import { ProductDetailsPage } from '../features/products/pages/ProductDetailsPage'
import { ProductGalleryPage } from '../features/products/pages/ProductGalleryPage'
import { ProductAddPage } from '../features/products/pages/ProductAddPage'
import { ProductEditPage } from '../features/products/pages/ProductEditPage'

export const productRoutes = [
    <Route key="products" path="/products">
        <Route path=":id" element={<ProductDetailsPage />} />
        <Route element={<RequireRole allowedRoles={['admin', 'mua']} />}>
            <Route index element={<ProductGalleryPage />} />
            <Route path="add" element={<ProductAddPage />} />
            <Route path="edit/:id" element={<ProductEditPage />} />
        </Route>
    </Route>,
]
