import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop = () => {
    const { pathname, state } = useLocation()

    useEffect(() => {
        if (!state?.scrollId) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [pathname])

    return null
}
