export const Footer = () => (
    <footer id="footer" className="page-footer">
        <section className="mx-auto max-w-4xl p-4">
            <h4 className="font-heading text-lg">Спасибо, что выбрали меня!</h4>
        </section>

        <section className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:flex-row sm:justify-between">
            <p>
                Если остались вопросы по косметике или необходим урок по
                какому-либо ещё макияжу, обращайтесь по телефону:{' '}
                <a
                    href="tel:+381629446904"
                    className="text-rose-500 hover:underline hover:decoration-wavy dark:text-rose-400"
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
                v6.7.0 &copy; <span id="year">2025</span> Beautycase
            </p>
        </section>
    </footer>
)
