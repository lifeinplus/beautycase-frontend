const Footer = () => (
    <footer id="footer" className="p-4 bg-teal-700 text-white text-xl">
        <section className="max-w-4xl mx-auto p-4">
            <h3 className="font-bold">Спасибо, что выбрали меня!</h3>
        </section>
        <section className="max-w-4xl mx-auto p-4 flex flex-col sm:flex-row sm:justify-between gap-4">
            <p className="text-base">
                Если остались вопросы по косметике или необходим урок
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                по какому-либо ещё макияжу, обращайтесь по телефону:
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <a href="tel:+79649579167" className="hover:opacity-80">
                    8-964-957-9167
                </a>{" "}
                <br className="sm:hidden" />
                Буду рада помочь)
            </p>
            <p className="text-base">
                Мои услуги: все виды макияжа,
                <br />
                укладки, причёски, обучение, <br />
                подарочные сертификаты
            </p>
        </section>
        <section className="max-w-4xl mx-auto p-4">
            <p>
                &copy; <span id="year">2024</span> Beauty Case
            </p>
        </section>
    </footer>
);

export default Footer;
