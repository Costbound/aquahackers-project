import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import css from './AquaTrackerPage.module.css';
import Page from "../../components/Page/Page.jsx";

const AquaTrackerPage = () => {
    return (
        
        <div>
            <Page>
                <div className={css.waterMainInfoContainer}><WaterMainInfo/></div>

                <div className={css.waterDetailedInfoContainer}><WaterDetailedInfo/></div>
            </Page>
        </div>
    );
};

export default AquaTrackerPage;
