// WaterDetailedInfo.jsx
import UserPanel from "../UserPanel/UserPanel";
import DailyInfo from "../DailyInfo/DailyInfo";
import css from "./WaterDetailedInfo.module.css";
import MonthInfo from "../MonthInfo/MonthInfo";

function WaterDetailedInfo() {
  return (
    <div className={css.waterDetailedInfo}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
}

export default WaterDetailedInfo;
