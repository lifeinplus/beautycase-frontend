import Header from "./components/Header";
import Stage from "./components/Stage";
import Brushes from "./components/Brushes";
import Conclusion from "./components/Conclusion";
import data from "./data/data.json";

const App = () => (
    <div>
        <Header
            title={data.title}
            subtitle={data.subtitle}
            image={data.image}
        />
        {data.stages.map((stage, index) => (
            <Stage key={index} {...stage} />
        ))}
        <Brushes {...data.brushes} />
        <Conclusion {...data.conclusion} />
    </div>
);

export default App;
