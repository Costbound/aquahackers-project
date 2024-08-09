// WaterDetailedInfo.jsx
import UserPanel from "../UserPanel/UserPanel";
import DailyInfo from "../DailyInfo/DailyInfo";
import css from "./WaterDetailedInfo.module.css";
import MonthInfo from "../MonthInfo/MonthInfo";

function WaterDetailedInfo() {
  return (
    <section className={css.section}>
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </section>
  );
}

export default WaterDetailedInfo;
