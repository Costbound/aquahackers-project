import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterButton from '../AddWaterButton/AddWaterButton';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

const DailyInfo = () => {

    return (
        <div className={css.dailyInfo}>
            <div className={css.dailyInfoContainer}>
                <ChooseDate />
                <AddWaterButton />     
            </div>
                <WaterList />
        </div>
    );
}

export default DailyInfo;
