const Footer = () => (
    <footer
        id="footer"
        className="mb-navbar-bottom sm:ms-navbar-left lg:ms-navbar-left-open border-t border-gray-800 bg-black text-white sm:mb-0"
    >
        <section className="mx-auto max-w-4xl p-4">
            <h4 className="font-heading text-lg">Спасибо, что выбрали меня!</h4>
        </section>

        <section className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:flex-row sm:justify-between">
            <p>
                Если остались вопросы по косметике или необходим урок по
                какому-либо ещё макияжу, обращайтесь по телефону:{' '}
                <a
                    href="tel:+381629446904"
                    className="text-rose-400 hover:underline hover:decoration-wavy"
                >
                    +381 62 9446 904 (Сербия)
                </a>
                {' Буду рада помочь)'}
            </p>
            <p>
                Мои услуги: все виды макияжа, укладки, причёски, обучение,
                подарочные сертификаты
            </p>
        </section>

        <section className="mx-auto max-w-4xl p-4">
            <p>
                v0.1.0 &copy; <span id="year">2024</span> Beautycase
            </p>
        </section>
    </footer>
)

export default Footer
