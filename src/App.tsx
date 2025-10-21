import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from './app/hooks/hooks'
import { accountRoutes } from './app/routes/account/accountRoutes'
import { controlCenterRoutes } from './app/routes/control-center/controlCenterRoutes'
import { lessonRoutes } from './app/routes/lessons/lessonsRoutes'
import { makeupBagRoutes } from './app/routes/makeup-bags/makeupBagsRoutes'
import { productRoutes } from './app/routes/products/productsRoutes'
import { publicRoutes } from './app/routes/public/publicRoutes'
import { questionnaireRoutes } from './app/routes/questionnaires/questionnairesRoutes'
import { stageRoutes } from './app/routes/stages/stagesRoutes'
import { toolRoutes } from './app/routes/tools/toolsRoutes'
import { ScrollToTop } from './app/ui/scroll-to-top/ScrollToTop'
import { PersistLogin } from './features/auth/components/persist-login/PersistLogin'
import { RequireAuth } from './features/auth/components/require-auth/RequireAuth'
import { selectDarkMode } from './features/theme/slice/themeSlice'

const App = () => {
    const darkMode = useAppSelector(selectDarkMode)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        }
    }, [darkMode])

    return (
        <div>
            <ScrollToTop />

            <Toaster
                toastOptions={{
                    duration: 5000,
                    style: {
                        backgroundColor: darkMode ? '#171717' : '#fafafa',
                        color: darkMode ? '#e5e5e5' : '#000',
                    },
                }}
            />

            <Routes>
                <Route element={<PersistLogin />}>
                    {publicRoutes}

                    <Route element={<RequireAuth />}>
                        {accountRoutes}
                        {controlCenterRoutes}
                        {lessonRoutes}
                        {makeupBagRoutes}
                        {productRoutes}
                        {questionnaireRoutes}
                        {stageRoutes}
                        {toolRoutes}
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
