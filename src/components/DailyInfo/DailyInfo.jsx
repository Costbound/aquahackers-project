import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import styles from './DailyInfo.module.css';

const DailyInfo = () => {
    return (
        <div className={styles.dailyInfo}>
            <ChooseDate />
            <AddWaterBtn />
            <WaterList />
        </div>
    );
};

export default DailyInfo;
