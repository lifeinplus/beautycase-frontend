import { Link } from '@/shared/components/ui/link/Link'
import { NotSpecified } from './NotSpecified'

interface InstagramFieldProps {
    username?: string
}

export const InstagramField = ({ username }: InstagramFieldProps) => {
    if (!username) return <NotSpecified />

    const cleanUsername = username.startsWith('@')
        ? username.slice(1)
        : username
    const url = `https://instagram.com/${cleanUsername}`

    return <Link url={url} text={`@${cleanUsername}`} />
}
