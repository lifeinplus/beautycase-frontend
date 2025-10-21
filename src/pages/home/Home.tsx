import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { menuItems } from '@/app/config/menu'
import { useAppSelector } from '@/app/hooks/hooks'
import { useAuthLogout } from '@/features/auth/hooks/auth-logout/useAuthLogout'
import { selectRole, selectUsername } from '@/features/auth/slice/authSlice'
import { Tile } from '@/shared/components/tile/Tile'
import { LanguageSelect } from '@/shared/components/ui/language/select/LanguageSelect'
import { canAccess } from '@/shared/lib/access/canAccess'

export const Home = () => {
    const { t } = useTranslation('home')
    const handleLogout = useAuthLogout()

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    const accessibleMenuItems = menuItems.filter((item) =>
        canAccess(item, username, role)
    )

    const itemCount = accessibleMenuItems.length

    return (
        <div className="pt-safe-top pb-safe-bottom flex min-h-screen flex-col items-center justify-center">
            <div className="flex max-w-xs flex-grow flex-col sm:max-w-md">
                <div className="my-10 text-center">
                    <h2 className="font-logo mt-4 mb-10 text-5xl sm:text-6xl lg:text-7xl">
                        Beautycase
                    </h2>
                    <p className="font-heading text-lg text-gray-700 sm:text-xl lg:text-2xl dark:text-gray-400">
                        {t('motto')}
                    </p>
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
                        <Tile
                            key={index}
                            to={item.path}
                            label={t(`navigation:${item.label}`)}
                            icon={item.icon}
                        />
                    ))}
                </div>

                <div className="mx-auto mt-16 w-full max-w-67 sm:mb-5">
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
                                className={classNames(
                                    'flex w-full justify-center gap-4 rounded-lg px-4 py-2 text-base font-semibold text-white transition-colors md:w-67',
                                    'bg-rose-500 hover:bg-rose-600',
                                    'dark:bg-rose-600 dark:hover:bg-rose-700',
                                    'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                                    'dark:focus-visible:outline-rose-700'
                                )}
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
                                    className={classNames(
                                        'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                                        'dark:focus-visible:outline-rose-700',
                                        'rounded-lg bg-rose-500 px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-rose-600',
                                        'dark:bg-rose-600 dark:hover:bg-rose-700'
                                    )}
                                    to="/login"
                                >
                                    {t('link.login')}
                                </Link>
                                <Link
                                    className={classNames(
                                        'focus-visible:rounded focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-rose-600 focus-visible:outline-dashed',
                                        'dark:focus-visible:outline-rose-700',
                                        'bg-white px-4 py-2 text-center font-semibold text-rose-500 transition-colors hover:bg-neutral-100',
                                        'rounded-lg border border-rose-500',
                                        'dark:border-rose-600 dark:bg-black dark:hover:bg-neutral-800'
                                    )}
                                    to="/register"
                                >
                                    {t('link.register')}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-10 mb-5 flex">
                <LanguageSelect />
            </div>
        </div>
    )
}
