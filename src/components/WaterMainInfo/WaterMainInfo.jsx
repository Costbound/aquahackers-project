
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import Logo from '../Logo/Logo.jsx';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import css from './WaterMainInfo.module.css';
import SectionWithLogo from "../SectionWithLogo/SectionWithLogo.jsx";

export default function WaterMainInfo(){
    return (
        <SectionWithLogo className={css.container}>
            <WaterDailyNorma />
            <WaterProgressBar />
            <div className={css.addWater}><AddWaterBtn/></div>
        </SectionWithLogo>
    )
}