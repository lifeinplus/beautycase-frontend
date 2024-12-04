import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { MakeupBagPage } from './components'
import { LoginPage, selectUsername } from './features/auth'
import { selectDarkMode } from './features/theme'

const App = () => {
    const darkMode = useAppSelector(selectDarkMode)
    const username = useAppSelector(selectUsername)

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
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/"
                    element={username ? <MakeupBagPage /> : <LoginPage />}
                />
                <Route path="/makeup-bag" element={<MakeupBagPage />} />
            </Routes>
        </div>
    )
}

export default App
