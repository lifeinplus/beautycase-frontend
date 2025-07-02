import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { canAccess, menuItems } from '../../../utils/menu'
import { selectRole, selectUsername } from '../../auth/authSlice'
import { useAuthLogout } from '../../auth/hooks/useAuthLogout'
import { HomeButton } from '../components/HomeButton'

export const HomePage = () => {
    const { t } = useTranslation('home')
    const handleLogout = useAuthLogout()

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    return (
        <div className="home">
            <div className="home-container">
                <div className="text-center">
                    <h1 className="home-title">{t('title')}</h1>
                    <h2 className="home-logo">Beautycase</h2>
                    <p className="home-motto">{t('motto')}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {menuItems
                        .filter((item) => canAccess(item, username, role))
                        .map((item, index) => (
                            <HomeButton
                                key={index}
                                to={item.path}
                                label={t(`navigation:${item.label}`)}
                            />
                        ))}
                </div>

                <div className="mt-10 sm:mb-5">
                    <p className="home-auth">
                        {username ? (
                            <>
                                {t('auth.loggedIn')}: {username} (
                                <button
                                    className="focus-outline text-danger font-semibold"
                                    onClick={handleLogout}
                                >
                                    {t('auth.logout')}
                                </button>
                                )
                            </>
                        ) : (
                            <>
                                <Link
                                    className="focus-outline text-danger font-semibold"
                                    to="/login"
                                >
                                    {t('link.login')}
                                </Link>{' '}
                                {t('link.or')}{' '}
                                <Link
                                    className="focus-outline text-danger font-semibold"
                                    to="/register"
                                >
                                    {t('link.register')}
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
