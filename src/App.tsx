import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { ScrollToTop } from './components'
import {
    LoginPage,
    PersistLogin,
    RegisterPage,
    RequireAuth,
    RequireRole,
    UnauthorizedPage,
} from './features/auth'
import { HomePage } from './features/home'
import {
    LessonAddPage,
    LessonDetailsPage,
    LessonEditPage,
    LessonsGalleryPage,
} from './features/lessons'
import {
    MakeupBagAddPage,
    MakeupBagEditPage,
    MakeupBagListPage,
    MakeupBagPage,
} from './features/makeupBags'
import {
    ProductAddPage,
    ProductEditPage,
    ProductGalleryPage,
    ProductDetailsPage,
    ProductSelectionPage,
} from './features/products'
import {
    ConfirmationPage,
    QuestionnaireListPage,
    QuestionnairePage,
    QuestionnaireResultPage,
} from './features/questionnaires'
import {
    StageAddPage,
    StageDetailsPage,
    StageEditPage,
    StageListPage,
    StageSelectionPage,
} from './features/stages'
import { selectDarkMode } from './features/theme'
import {
    ToolAddPage,
    ToolDetailsPage,
    ToolEditPage,
    ToolsGalleryPage,
} from './features/tools'

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
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
