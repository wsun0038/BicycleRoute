import Header from "../../components/Header/Header";
import Hero from "../../components/hero/Hero";
import Reason from "../../components/reason/Reason";
import css from "../../styles/app.module.scss" 
const Insight = () => {
  return <div className={`bg-primary ${css.container}`}>
      <Header/>
      <div>Insight Page</div>
  </div>;
};

export default Insight;