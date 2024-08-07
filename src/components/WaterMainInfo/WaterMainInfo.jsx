
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import Logo from '../Logo/Logo.jsx';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar.jsx';
import css from './WaterMainInfo.module.css';

export default function WaterMainInfo(){
    return (
        <div className={css.container}>
            <Logo/>
            <WaterDailyNorma />
            <WaterProgressBar />
            <div className={css.addWater}><AddWaterBtn/></div>
        </div>
    )
}