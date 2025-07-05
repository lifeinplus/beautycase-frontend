import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { LanguageSelect } from '../../../shared/components/ui/LanguageSelect'
import { canAccess, menuItems } from '../../../shared/utils/menu'
import { selectRole, selectUsername } from '../../auth/authSlice'
import { useAuthLogout } from '../../auth/hooks/useAuthLogout'
import { HomeTile } from '../components/HomeTile'

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
            <div className="flex max-w-xs flex-grow flex-col sm:max-w-md">
                <div className="my-10 text-center">
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
                        <HomeTile
                            key={index}
                            to={item.path}
                            label={t(`navigation:${item.label}`)}
                            icon={item.icon}
                        />
                    ))}
                </div>

                <div className="mx-auto mt-16 w-full max-w-60 sm:mb-5">
                    {username ? (
                        <>
                            <div className="mb-4 text-center">
                                <p className="mb-1 text-sm text-gray-700 dark:text-gray-400">
                                    {t('auth.loggedIn')}
                                </p>
                                <p className="font-heading text-lg font-semibold text-black dark:text-white">
                                    {username}
                                </p>
                            </div>
                            <button
                                className="focus-outline btn"
                                onClick={handleLogout}
                            >
                                {t('auth.logout')}
                            </button>
                        </>
                    ) : (
                        <div className="mb-6 text-center">
                            <p className="mb-4 text-lg text-gray-700 dark:text-gray-400">
                                {t('auth.getStarted')}
                            </p>
                            <div className="flex flex-col gap-3">
                                <Link
                                    className="focus-outline home-btn-login"
                                    to="/login"
                                >
                                    {t('link.login')}
                                </Link>
                                <Link
                                    className="focus-outline home-btn-register"
                                    to="/register"
                                >
                                    {t('link.register')}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-5 mt-10 flex">
                <LanguageSelect />
            </div>
        </div>
    )
}
