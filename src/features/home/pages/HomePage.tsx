import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { canAccess, menuItems } from '../../../utils/menu'
import { selectRole, selectUsername } from '../../auth/authSlice'
import { useAuthLogout } from '../../auth/hooks/useAuthLogout'
import { HomeButton } from '../components/HomeButton'

export const HomePage = () => {
    const handleLogout = useAuthLogout()

    const role = useAppSelector(selectRole)
    const username = useAppSelector(selectUsername)

    return (
        <div className="home">
            <div className="home-container">
                <div className="text-center">
                    <h1 className="home-title">Добро пожаловать в</h1>
                    <h2 className="home-logo">Beautycase</h2>
                    <p className="home-motto">
                        Все ваши инструменты и продукты для макияжа в одном
                        месте.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {menuItems
                        .filter((item) => canAccess(item, username, role))
                        .map((item, index) => (
                            <HomeButton
                                key={index}
                                to={item.path}
                                label={item.label}
                            />
                        ))}
                </div>

                <div className="mt-10 sm:mb-5">
                    <p className="home-auth">
                        {username ? (
                            <>
                                Выполнен вход: {username} (
                                <button
                                    className="home-link"
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </button>
                                )
                            </>
                        ) : (
                            <>
                                <Link className="home-link" to="/login">
                                    Войти
                                </Link>{' '}
                                или{' '}
                                <Link className="home-link" to="/register">
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
