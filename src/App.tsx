import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { HomePage, MakeupBagPage } from './components'
import { LoginPage, PersistLogin, RequireAuth } from './features/auth'
import { selectDarkMode } from './features/theme'

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
                        border: '1px solid #f43f5e',
                        borderRadius: '8px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        paddingTop: '6px',
                        paddingBottom: '6px',
                    },
                }}
            />
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<RequireAuth />}>
                        <Route path="/makeup-bag" element={<MakeupBagPage />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App
