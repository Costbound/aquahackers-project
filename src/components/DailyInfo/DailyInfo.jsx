import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

const DailyInfo = () => {
    const handleAddWater = () => {
        // Логика добавления воды
    };

    return (
        <div className={css.dailyInfo}>
            <div className={css.dailyInfoContainer}>
           <ChooseDate />
            <AddWaterBtn onAddWater={handleAddWater} />     
            </div>
            <WaterList />
        </div>
    );
}

export default DailyInfo;
