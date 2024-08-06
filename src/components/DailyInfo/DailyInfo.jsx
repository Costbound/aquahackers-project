import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

const DailyInfo = () => {

    return (
        <div className={css.dailyInfo}>
            <div className={css.dailyInfoContainer}>
                <ChooseDate />
                <AddWaterBtn />     
            </div>
                <WaterList />
        </div>
    );
}

export default DailyInfo;
