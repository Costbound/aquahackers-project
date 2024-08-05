import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./AquaTrackerPage.module.css";

function AquaTrackerPage(props) {
  return (
    <div className={css.container}>
      <WaterDetailedInfo />
    </div>
  );
}

export default AquaTrackerPage;
