import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { ScrollToTop } from './components/ScrollToTop'
import { PersistLogin } from './features/auth/components/PersistLogin'
import { RequireAuth } from './features/auth/components/RequireAuth'
import { selectDarkMode } from './features/theme/themeSlice'
import { accountRoutes } from './routes/accountRoutes'
import { lessonRoutes } from './routes/lessonRoutes'
import { makeupBagRoutes } from './routes/makeupBagRoutes'
import { productRoutes } from './routes/productRoutes'
import { publicRoutes } from './routes/publicRoutes'
import { questionnaireRoutes } from './routes/questionnaireRoutes'
import { referenceListRoutes } from './routes/referenceListRoutes'
import { stageRoutes } from './routes/stageRoutes'
import { toolRoutes } from './routes/toolRoutes'

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
