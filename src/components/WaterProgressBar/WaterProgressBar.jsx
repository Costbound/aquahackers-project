import { useSelector } from 'react-redux';
import {selectTodayProgress} from '../../redux/water/selectors-water.js';
import css from './WaterProgressBar.module.css';


export default function WaterProgressBar() {

    const progress = useSelector(selectTodayProgress);

    return (
        <div className={css.container}>
            <div className={css.containerToday}>
                <h2 className={css.text}>Today</h2>
                <div>
                    <div className={css.progressContainer}>
                        <div className={css.progressBar}
                           style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                        ></div>
                        <div className={css.spanProgress}>
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                        <div className={css.elipce} style={{ left: `calc(${Math.min(Math.max(progress, 0), 100)}% - 6px)` }}>{(progress > 8 && progress < 38) || (progress > 54 && progress < 84) ? (<span className={css.interest}>{`${progress}%`}</span>) : null}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}