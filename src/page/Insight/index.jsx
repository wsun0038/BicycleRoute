import Header from "../../components/Header/Header";
import Hero from "../../components/hero/Hero";
import Mapc from "../../components/map/Mapc";
import Reason from "../../components/reason/Reason";
import css from "../../styles/app.module.scss" 
const Insight = () => {
  return <div className={`backg-primary ${css.container}`}>
      <Header/>
      <Mapc />
  </div>;
};

export default Insight;