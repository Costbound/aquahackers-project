import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtnNikita from '../AddWaterBtnNikita/AddWaterBtnNikita';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

const DailyInfo = () => {

    return (
        <div className={css.dailyInfo}>
            <div className={css.dailyInfoContainer}>
                <ChooseDate />
                <AddWaterBtnNikita />     
            </div>
                <WaterList />
        </div>
    );
}

export default DailyInfo;
