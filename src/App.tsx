import {
    AdaptiveNavBar,
    Brands,
    Footer,
    Header,
    Hero,
    Stages,
} from './components'

const App = () => (
    <div>
        <Header />
        <main className="flex flex-col items-center justify-center sm:ms-navbar-left lg:ms-navbar-left-open">
            <div className="w-full max-w-2xl">
                <Hero />
                <Stages />
                <Brands />
            </div>
        </main>
        <AdaptiveNavBar />
        <Footer />
    </div>
)

export default App
