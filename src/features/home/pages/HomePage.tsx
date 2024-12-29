import { Link } from 'react-router-dom'

import { useAppSelector } from '../../../app/hooks'
import { selectUsername, useAuthLogout } from '../../auth'

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
                    <Link to="/questionnaire" className="home__button">
                        Анкета
                    </Link>

                    {username && (
                        <>
                            <Link to="/questionnaires" className="home__button">
                                Анкеты
                            </Link>
                            <Link to="/makeup_bag" className="home__button">
                                Косметичка
                            </Link>
                            <Link to="/products" className="home__button">
                                Продукты
                            </Link>
                            <Link to="/tools" className="home__button">
                                Инструменты
                            </Link>
                            <Link to="/lessons" className="home__button">
                                Уроки
                            </Link>
                        </>
                    )}
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
