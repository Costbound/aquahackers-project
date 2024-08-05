import MonthInfo from "../MonthInfo/MonthInfo";
import css from "./WaterDetailedInfo.module.css";

export default function WaterDetailedInfo(props) {
  return (
    <div className={css.container}>
      <MonthInfo />
    </div>
  );
}
