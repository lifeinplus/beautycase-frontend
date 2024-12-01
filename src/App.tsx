import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from './app/hooks'
import { MakeupBagPage } from './components'
import { LoginPage } from './features/auth'
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
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/makeup-bag" element={<MakeupBagPage />} />
            </Routes>
        </div>
    )
}

export default App
