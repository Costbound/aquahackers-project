
import { useDispatch, useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';
import { selectedWater } from '../../redux/water/selectors-water.js';
import { fetchWater } from '../../redux/water/ops-water.js';
import { useEffect } from 'react';
import { selectWaterRate } from '../../redux/userData/selectors-userData.js';

export default function WaterDailyNorma() {
    // const allWaterInMilliliters = useSelector(selectedWater);
    // const allWaterInLiters = allWaterInMilliliters / 1000;
    const waterRate = useSelector(selectWaterRate)/1000;
    // const dispatch = useDispatch(fetchWater);

    // useEffect(() => {
    //     dispatch(fetchWater());
    // }, [dispatch]);

    
    return (
        <div className={css.container}>
            <h3 className={css.textAllWater}>{waterRate.toFixed(1)} L</h3>
            <p className={css.textNorma}>My daily norma</p>
        </div>
    )
}