import Header from "./components/Header/Header"
import Hero from "./components/hero/Hero";
import css from "./styles/app.module.scss" 
const App = () => {
  return <div className={`bg-primary1 ${css.container}`}>
      <Header/>
      <Hero/>
      <Reason/>
  </div>;
};

export default App;
