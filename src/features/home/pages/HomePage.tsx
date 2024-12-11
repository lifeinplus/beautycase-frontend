import { Link } from 'react-router-dom'

export const HomePage = () => {
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
                    <Link to="/makeup_bag" className="home__button">
                        Косметичка
                    </Link>
                    <Link to="/product_gallery" className="home__button">
                        Продукты
                    </Link>
                    <Link to="/tools_gallery" className="home__button">
                        Инструменты
                    </Link>
                </div>

                <div className="mt-10 sm:mb-5">
                    <p className="home__auth">
                        <Link className="home__link" to="/login">
                            Войти
                        </Link>{' '}
                        или{' '}
                        <Link className="home__link" to="/register">
                            зарегистрироваться
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
