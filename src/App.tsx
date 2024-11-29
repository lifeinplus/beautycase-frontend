import AdaptiveNavBar from './components/AdaptiveNavBar'
import Brands from './components/Brands'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Stages from './components/Stages'
import data from './data/data.json'

const App = () => (
    <div>
        <Header />
        <main className="flex flex-col items-center justify-center sm:ms-navbar-left lg:ms-navbar-left-open">
            <div className="w-full max-w-2xl">
                <Hero
                    title={data.title}
                    subtitle={data.subtitle}
                    image={data.image}
                />
                <Stages stages={data.stages} />
                <Brands brands={data.brands} />
            </div>
        </main>
        <AdaptiveNavBar />
        <Footer />
    </div>
)

export default App
