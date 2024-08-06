import { useSelector } from 'react-redux';
import { selectorAllDayWater } from '../../redux/water/selectors-water.js';
import css from './WaterDailyNorma.module.css';

export default function WaterDailyNorma() {
    const allWaterInMilliliters = useSelector(selectorAllDayWater)
    const allWaterInLiters = allWaterInMilliliters / 1000;
    
    return (
        <div className={css.container}>
            <h3 className={css.textAllWater}>{allWaterInLiters.toFixed(2)} L</h3>
            <p className={css.textNorma}>My daily norma</p>
        </div>
    )
}