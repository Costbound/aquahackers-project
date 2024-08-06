import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import css from "./AquaTrackerPage.module.css";

function AquaTrackerPage(props) {
  return (
    <div className={css.container}>
      <WaterMainInfo/>
      <WaterDetailedInfo />
    </div>
  );
}

export default AquaTrackerPage;
