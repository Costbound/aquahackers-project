// WaterDetailedInfo.jsx
import UserPanel from '../UserPanel/UserPanel';
import DailyInfo from '../DailyInfo/DailyInfo';
import css from './WaterDetailedInfo.module.css'; 

function WaterDetailedInfo() {
    return (
        <div className={css.waterDetailedInfo}>
            <UserPanel />
            <DailyInfo />
        </div>
    );
}

export default WaterDetailedInfo;