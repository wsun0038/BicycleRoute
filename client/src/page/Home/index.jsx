import Header from "../../components/Header/Header";
import Hero from "../../components/hero/Hero";
import Reason from "../../components/reason/Reason";
import TestComponent from "../../components/TestComponent";
import css from "../../styles/app.module.scss" 
const Home = () => {
  return <div className={`backg-primary ${css.container}`}>
      <Header/>
      <Hero/>
      <Reason/>
  </div>;
};

export default Home;