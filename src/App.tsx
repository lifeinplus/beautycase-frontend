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
                subtitle1={data.subtitle1}
                subtitle2={data.subtitle2}
                subtitle3={data.subtitle3}
                image={data.image}
            />
            <hr className="mx-auto bg-black dark:bg-white w-1/2" />
            <Stages stages={data.stages} />
            <hr className="mx-auto bg-black dark:bg-white w-1/2" />
            <Brushes {...data.brushes} />
        </main>
        <Footer />
    </div>
);

export default App;
