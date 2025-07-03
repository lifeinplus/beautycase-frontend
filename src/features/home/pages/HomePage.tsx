import classNames from 'classnames'
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

    const accessibleMenuItems = menuItems.filter((item) =>
        canAccess(item, username, role)
    )

    const itemCount = accessibleMenuItems.length

    return (
        <div className="home">
            <div className="max-w-xs sm:max-w-md">
                <div className="mb-10 text-center">
                    <h2 className="home-logo">Beautycase</h2>
                    <p className="home-motto">{t('motto')}</p>
                </div>

                <div
                    className={classNames(
                        'mx-auto grid gap-x-4 gap-y-3',
                        itemCount === 1
                            ? 'max-w-36 grid-cols-1'
                            : itemCount === 2
                              ? 'max-w-xs grid-cols-2'
                              : 'max-w-4xl grid-cols-2 sm:grid-cols-3'
                    )}
                >
                    {accessibleMenuItems.map((item, index) => (
                        <HomeButton
                            key={index}
                            to={item.path}
                            label={t(`navigation:${item.label}`)}
                            icon={item.icon}
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
