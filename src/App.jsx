import Header from "./components/Header/Header"
import Hero from "./components/hero/Hero";
import css from "./styles/app.module.scss" 
const App = () => {
  return <div className={`bg-primary ${css.container}`}>
      <Header/>
      <Hero/>
  </div>;
};

export default App;
