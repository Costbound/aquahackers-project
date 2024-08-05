// WaterDetailedInfo.jsx
import UserPanel from '../UserPanel/UserPanel';
import DailyInfo from '../DailyInfo/DailyInfo';
import css from './WaterDetailedInfo.module.css'; 
import Calendar from '../Calendar/Calendar';

function WaterDetailedInfo() {
    return (
        <div className={css.waterDetailedInfo}>
            <UserPanel />
            <DailyInfo />
            <Calendar />
        </div>
    );
}

export default WaterDetailedInfo;