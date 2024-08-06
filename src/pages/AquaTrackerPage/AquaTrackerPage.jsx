import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import css from './AquaTrackerPage.module.css';

const AquaTrackerPage = () => {
    return (
        
        <div>
            <div className={css.waterMainInfoContainer}><WaterMainInfo /></div> 
            
            <div className={css.waterDetailedInfoContainer}><WaterDetailedInfo /></div>
        </div>
    );
};

export default AquaTrackerPage;
