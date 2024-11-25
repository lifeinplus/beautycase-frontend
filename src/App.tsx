import AdaptiveNavBar from './components/AdaptiveNavBar'
import Brushes from './components/Brushes'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Stages from './components/Stages'
import data from './data/data.json'

const App = () => (
    <div>
        <Header />

        <main className="sm:ms-navbar-left lg:ms-navbar-left-open flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl">
                <Hero
                    title={data.title}
                    subtitle={data.subtitle}
                    image={data.image}
                />
                <Stages stages={data.stages} />
                <Brushes brushes={data.brushes} />
            </div>
        </main>
        <AdaptiveNavBar />
        <Footer />
    </div>
)

export default App
