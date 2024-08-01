
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import css from './AquaTrackerPage.module.css';

const AquaTrackerPage = () => {
    return (
        <div className={css.aquaTrackerPage}>
            <WaterDetailedInfo />
        </div>
    );
};

export default AquaTrackerPage;