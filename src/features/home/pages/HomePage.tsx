import { Link } from 'react-router-dom'

export const HomePage = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center text-white">
            <div className="max-w-80">
                <div className="text-center">
                    <h1 className="mb-4 font-heading text-4xl font-bold sm:text-6xl">
                        Добро пожаловать в
                    </h1>
                    <h2 className="mb-10 mt-4 font-logo text-5xl font-bold sm:text-6xl">
                        Beautycase
                    </h2>
                    <p className="mb-8 text-lg text-slate-400 sm:text-xl">
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
                    <Link to="/tool_gallery" className="home__button">
                        Инструменты
                    </Link>
                </div>

                <div className="mt-10 sm:mb-5">
                    <p className="text-center">
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
