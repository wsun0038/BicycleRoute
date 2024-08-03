import Header from "../../components/Header/Header";
import Hero from "../../components/hero/Hero";
import Mapc from "../../components/map/Mapc";
import MapRoute from "../../components/map/MapRoute";
import Reason from "../../components/reason/Reason";
import css from "../../styles/app.module.scss" 
const Route = () => {
  return <div className={`backg-primary ${css.container}`}>
      <Header/>
      <MapRoute />
  </div>;
};

export default Route;