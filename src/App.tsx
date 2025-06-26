import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { ScrollToTop } from './components/ScrollToTop'
import { AccountPage } from './features/account/pages/AccountPage'
import { PersistLogin } from './features/auth/components/PersistLogin'
import { RequireAuth } from './features/auth/components/RequireAuth'
import { RequireRole } from './features/auth/components/RequireRole'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { UnauthorizedPage } from './features/auth/pages/UnauthorizedPage'
import { BrandsPage } from './features/brands/pages/BrandsPage'
import { HomePage } from './features/home/pages/HomePage'
import { LessonAddPage } from './features/lessons/pages/LessonAddPage'
import { LessonDetailsPage } from './features/lessons/pages/LessonDetailsPage'
import { LessonEditPage } from './features/lessons/pages/LessonEditPage'
import { LessonsGalleryPage } from './features/lessons/pages/LessonsGalleryPage'
import { MakeupBagAddPage } from './features/makeupBags/pages/MakeupBagAddPage'
import { MakeupBagEditPage } from './features/makeupBags/pages/MakeupBagEditPage'
import { MakeupBagListPage } from './features/makeupBags/pages/MakeupBagListPage'
import { MakeupBagPage } from './features/makeupBags/pages/MakeupBagPage'
import { ProductAddPage } from './features/products/pages/ProductAddPage'
import { ProductDetailsPage } from './features/products/pages/ProductDetailsPage'
import { ProductEditPage } from './features/products/pages/ProductEditPage'
import { ProductGalleryPage } from './features/products/pages/ProductGalleryPage'
import { ProductSelectionPage } from './features/products/pages/ProductSelectionPage'
import { ConfirmationPage } from './features/questionnaires/pages/ConfirmationPage'
import { QuestionnairePage } from './features/questionnaires/pages/QuestionnairePage'
import { QuestionnaireListPage } from './features/questionnaires/pages/QuestionnaireListPage'
import { QuestionnaireResultPage } from './features/questionnaires/pages/QuestionnaireResultPage'
import { ReferenceListsPage } from './features/referenceLists/pages/ReferenceListsPage'
import { StageAddPage } from './features/stages/pages/StageAddPage'
import { StageDetailsPage } from './features/stages/pages/StageDetailsPage'
import { StageEditPage } from './features/stages/pages/StageEditPage'
import { StageListPage } from './features/stages/pages/StageListPage'
import { StageSelectionPage } from './features/stages/pages/StageSelectionPage'
import { StoreLinkAddPage } from './features/stores/pages/StoreLinkAddPage'
import { StoresPage } from './features/stores/pages/StoresPage'
import { selectDarkMode } from './features/theme/themeSlice'
import { ToolAddPage } from './features/tools/pages/ToolAddPage'
import { ToolDetailsPage } from './features/tools/pages/ToolDetailsPage'
import { ToolEditPage } from './features/tools/pages/ToolEditPage'
import { ToolsGalleryPage } from './features/tools/pages/ToolsGalleryPage'
import { ToolSelectionPage } from './features/tools/pages/ToolSelectionPage'
import { UserSelectionPage } from './features/users/pages/UserSelectionPage'

const App = () => {
    const darkMode = useAppSelector(selectDarkMode)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        }
    }, [darkMode])

    return (
        <div>
            <Toaster
                toastOptions={{
                    duration: 5000,
                    style: {
                        backgroundColor: darkMode ? '#171717' : '#fafafa',
                        color: darkMode ? '#e5e5e5' : '#000',
                    },
                }}
            />

            <ScrollToTop />

            <Routes>
                <Route element={<PersistLogin />}>
                    <Route path="/" element={<HomePage />} />

                    <Route
                        path="/confirmation"
                        element={<ConfirmationPage />}
                    />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/questionnaire"
                        element={<QuestionnairePage />}
                    />

                    <Route
                        path="/unauthorized"
                        element={<UnauthorizedPage />}
                    />

                    <Route element={<RequireAuth />}>
                        <Route path="/account" element={<AccountPage />} />

                        <Route path="/lessons">
                            <Route index element={<LessonsGalleryPage />} />

                            <Route path=":id" element={<LessonDetailsPage />} />

                            <Route
                                element={
                                    <RequireRole
                                        allowedRoles={['admin', 'mua']}
                                    />
                                }
                            >
                                <Route path="add" element={<LessonAddPage />} />

                                <Route
                                    path="edit/:id"
                                    element={<LessonEditPage />}
                                />

                                <Route
                                    path="edit/:id/clients"
                                    element={<UserSelectionPage />}
                                />
                            </Route>
                        </Route>

                        <Route path="/makeup_bags">
                            <Route path=":id" element={<MakeupBagPage />} />

                            <Route
                                element={
                                    <RequireRole
                                        allowedRoles={['admin', 'mua']}
                                    />
                                }
                            >
                                <Route index element={<MakeupBagListPage />} />
                                <Route
                                    path="add"
                                    element={<MakeupBagAddPage />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<MakeupBagEditPage />}
                                />
                            </Route>
                        </Route>

                        <Route path="/products">
                            <Route
                                path=":id"
                                element={<ProductDetailsPage />}
                            />

                            <Route
                                element={
                                    <RequireRole
                                        allowedRoles={['admin', 'mua']}
                                    />
                                }
                            >
                                <Route index element={<ProductGalleryPage />} />
                                <Route
                                    path="add"
                                    element={<ProductAddPage />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ProductEditPage />}
                                />
                                <Route
                                    path="selection"
                                    element={<ProductSelectionPage />}
                                />
                            </Route>
                        </Route>

                        <Route path="/questionnaires">
                            <Route
                                element={
                                    <RequireRole
                                        allowedRoles={['admin', 'mua']}
                                    />
                                }
                            >
                                <Route
                                    index
                                    element={<QuestionnaireListPage />}
                                />
                                <Route
                                    path=":id"
                                    element={<QuestionnaireResultPage />}
                                />
                            </Route>
                        </Route>

                        <Route path="/reference_lists">
                            <Route
                                element={
                                    <RequireRole allowedRoles={['admin']} />
                                }
                            >
                                <Route index element={<ReferenceListsPage />} />
                                <Route path="brands" element={<BrandsPage />} />
                                <Route path="stores" element={<StoresPage />} />
                            </Route>
                        </Route>

                        <Route path="/stages">
                            <Route
                                element={
                                    <RequireRole
                                        allowedRoles={['admin', 'mua']}
                                    />
                                }
                            >
                                <Route index element={<StageListPage />} />

                                <Route
                                    path=":id"
                                    element={<StageDetailsPage />}
                                />

                                <Route path="add" element={<StageAddPage />} />

                                <Route
                                    path="edit/:id"
                                    element={<StageEditPage />}
                                />

                                <Route
                                    path="selection"
                                    element={<StageSelectionPage />}
                                />
                            </Route>
                        </Route>

                        <Route path="/stores">
                            <Route
                                element={
                                    <RequireRole
                                        allowedRoles={['admin', 'mua']}
                                    />
                                }
                            >
                                <Route
                                    path="links/add"
                                    element={<StoreLinkAddPage />}
                                />
                            </Route>
                        </Route>

                        <Route path="/tools">
                            <Route path=":id" element={<ToolDetailsPage />} />

                            <Route
                                element={
                                    <RequireRole
                                        allowedRoles={['admin', 'mua']}
                                    />
                                }
                            >
                                <Route index element={<ToolsGalleryPage />} />
                                <Route path="add" element={<ToolAddPage />} />
                                <Route
                                    path="edit/:id"
                                    element={<ToolEditPage />}
                                />
                                <Route
                                    path="selection"
                                    element={<ToolSelectionPage />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
