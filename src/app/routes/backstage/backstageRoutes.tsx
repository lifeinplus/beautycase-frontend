import { Route } from 'react-router-dom'

import { AppLayout } from '@/app/layout/AppLayout'
import { RequireRole } from '@/features/auth/components/require-role/RequireRole'
import { LessonDetailsForBackstage } from '@/features/lessons/wrappers/details/backstage/LessonDetailsForBackstage'
import { MakeupBagDetailsForBackstage } from '@/features/makeup-bags/wrappers/details/backstage/MakeupBagDetailsForBackstage'
import { ProductDetailsForBackstage } from '@/features/products/wrappers/details/backstage/ProductDetailsForBackstage'
import { ProductSelectionForLesson } from '@/features/products/wrappers/selection/lesson/ProductSelectionForLesson'
import { ProductSelectionForStage } from '@/features/products/wrappers/selection/stage/ProductSelectionForStage'
import { StoreLinksAddForProduct } from '@/features/stores/wrappers/links-add/product/StoreLinksAddForProduct'
import { StoreLinksAddForTool } from '@/features/stores/wrappers/links-add/tool/StoreLinksAddForTool'
import { ToolDetailsForBackstage } from '@/features/tools/wrappers/details/backstage/ToolDetailsForBackstage'
import { BackstageGallery } from '@/pages/backstage/gallery/BackstageGallery'
import { LessonAdd } from '@/pages/lessons/add/LessonAdd'
import { LessonEdit } from '@/pages/lessons/edit/LessonEdit'
import { LessonGallery } from '@/pages/lessons/gallery/LessonGallery'
import { MakeupBagAdd } from '@/pages/makeup-bags/add/MakeupBagAdd'
import { MakeupBagEdit } from '@/pages/makeup-bags/edit/MakeupBagEdit'
import { MakeupBagList } from '@/pages/makeup-bags/list/MakeupBagList'
import { ProductAdd } from '@/pages/products/add/ProductAdd'
import { CategoryProducts } from '@/pages/products/category/CategoryProducts'
import { ProductEdit } from '@/pages/products/edit/ProductEdit'
import { ProductGallery } from '@/pages/products/gallery/ProductGallery'
import { StageAdd } from '@/pages/stages/add/StageAdd'
import { StageDetails } from '@/pages/stages/details/StageDetails'
import { StageEdit } from '@/pages/stages/edit/StageEdit'
import { StageList } from '@/pages/stages/list/StageList'
import { ToolAdd } from '@/pages/tools/add/ToolAdd'
import { ToolEdit } from '@/pages/tools/edit/ToolEdit'
import { ToolsGallery } from '@/pages/tools/gallery/ToolsGallery'
import { Role } from '@/shared/model/role'
import { StageSelection } from '@/widgets/stage/selection/StageSelection'
import { ToolSelection } from '@/widgets/tool/selection/ToolSelection'
import { UserSelection } from '@/widgets/user/selection/UserSelection'

export const backstageRoutes = [
    <Route key="backstage" path="/backstage" element={<AppLayout />}>
        <Route element={<RequireRole allowedRoles={[Role.ADMIN, Role.MUA]} />}>
            <Route index element={<BackstageGallery />} />

            <Route path="lessons">
                <Route index element={<LessonGallery />} />
                <Route path=":id" element={<LessonDetailsForBackstage />} />
                <Route path=":id/edit" element={<LessonEdit />} />
                <Route path=":id/edit/clients" element={<UserSelection />} />
                <Route
                    path=":id/products"
                    element={<ProductSelectionForLesson />}
                />
                <Route path="add" element={<LessonAdd />} />
                <Route path="add/clients" element={<UserSelection />} />
            </Route>

            <Route path="makeup-bags">
                <Route index element={<MakeupBagList />} />
                <Route path=":id" element={<MakeupBagDetailsForBackstage />} />
                <Route path=":id/edit" element={<MakeupBagEdit />} />
                <Route path=":id/edit/stages" element={<StageSelection />} />
                <Route path=":id/edit/tools" element={<ToolSelection />} />
                <Route path="add" element={<MakeupBagAdd />} />
                <Route path="add/stages" element={<StageSelection />} />
                <Route path="add/tools" element={<ToolSelection />} />
            </Route>

            <Route path="products">
                <Route index element={<ProductGallery />} />
                <Route path=":id" element={<ProductDetailsForBackstage />} />
                <Route path=":id/edit" element={<ProductEdit />} />
                <Route path=":id/links" element={<StoreLinksAddForProduct />} />
                <Route path="add" element={<ProductAdd />} />
                <Route
                    path="category/:category"
                    element={<CategoryProducts />}
                />
            </Route>

            <Route path="stages">
                <Route index element={<StageList />} />
                <Route path=":id" element={<StageDetails />} />
                <Route path=":id/edit" element={<StageEdit />} />
                <Route
                    path=":id/products"
                    element={<ProductSelectionForStage />}
                />
                <Route path="add" element={<StageAdd />} />
            </Route>

            <Route path="tools">
                <Route index element={<ToolsGallery />} />
                <Route path=":id" element={<ToolDetailsForBackstage />} />
                <Route path=":id/edit" element={<ToolEdit />} />
                <Route path=":id/links" element={<StoreLinksAddForTool />} />
                <Route path="add" element={<ToolAdd />} />
            </Route>
        </Route>
    </Route>,
]
