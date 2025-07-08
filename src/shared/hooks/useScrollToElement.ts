import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useScrollToElement = () => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()

    const [scrolled, setScrolled] = useState(false)

    const scroll = useCallback((node: HTMLDivElement | null) => {
        if (!node) return

        const { top, height } = node.getBoundingClientRect()

        window.scrollTo({
            top: top - height / 2,
            behavior: 'instant',
        })

        setScrolled(true)
    }, [])

    useEffect(() => {
        if (scrolled) {
            navigate(pathname, { replace: true })
        }
    }, [scrolled, navigate, pathname])

    return { pathname, state, scroll }
}
