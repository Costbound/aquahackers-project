import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

function DailyInfo() {
    return (
        <div className={css.dailyInfo}>
            <ChooseDate />
            <AddWaterBtn />
            <WaterList />
        </div>
    );
}

export default DailyInfo;
