import Brushes from "./components/Brushes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stages from "./components/Stages";
import data from "./data/data.json";

const App = () => (
    <div>
        <Header />
        <main className="max-w-4xl mx-auto">
            <Hero
                title={data.title}
                subtitle={data.subtitle}
                image={data.image}
            />
            <Stages stages={data.stages} />
            <Brushes brushes={data.brushes} />
        </main>
        <Footer />
    </div>
);

export default App;
