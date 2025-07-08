import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { accountRoutes } from './app/routes/accountRoutes'
import { lessonRoutes } from './app/routes/lessonRoutes'
import { makeupBagRoutes } from './app/routes/makeupBagRoutes'
import { productRoutes } from './app/routes/productRoutes'
import { publicRoutes } from './app/routes/publicRoutes'
import { questionnaireRoutes } from './app/routes/questionnaireRoutes'
import { referenceListRoutes } from './app/routes/referenceListRoutes'
import { stageRoutes } from './app/routes/stageRoutes'
import { toolRoutes } from './app/routes/toolRoutes'
import { PersistLogin } from './features/auth/components/PersistLogin'
import { RequireAuth } from './features/auth/components/RequireAuth'
import { selectDarkMode } from './features/theme/themeSlice'
import { ScrollToTop } from './shared/components/common/ScrollToTop'

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
                        {lessonRoutes}
                        {makeupBagRoutes}
                        {productRoutes}
                        {questionnaireRoutes}
                        {referenceListRoutes}
                        {stageRoutes}
                        {toolRoutes}
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
