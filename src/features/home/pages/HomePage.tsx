import { Link } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { canAccess, menuItems } from '../../../utils'
import { selectUsername, useAuthLogout } from '../../auth'
import { HomeButton } from '../components/HomeButton'

export const HomePage = () => {
    const username = useAppSelector(selectUsername)
    const handleLogout = useAuthLogout()

    return (
        <div className="home">
            <div className="max-w-xs sm:max-w-sm lg:max-w-lg">
                <div className="text-center">
                    <h1 className="home__title">Добро пожаловать в</h1>
                    <h2 className="home__logo">Beautycase</h2>
                    <p className="home__motto">
                        Все ваши инструменты и продукты для макияжа в одном
                        месте.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {menuItems
                        .filter((item) => canAccess(item))
                        .map((item, index) => (
                            <HomeButton
                                key={index}
                                to={item.path}
                                label={item.label}
                            />
                        ))}
                </div>

                <div className="mt-10 sm:mb-5">
                    <p className="home__auth">
                        {username ? (
                            <>
                                Выполнен вход: {username} (
                                <button
                                    className="home__link"
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </button>
                                )
                            </>
                        ) : (
                            <>
                                <Link className="home__link" to="/login">
                                    Войти
                                </Link>{' '}
                                или{' '}
                                <Link className="home__link" to="/register">
                                    зарегистрироваться
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}
