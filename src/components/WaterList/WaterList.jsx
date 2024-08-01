import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

function WaterList() {
    // Здесь должно быть получение данных о воде и рендеринг списка WaterItem
    return (
        <div className={css.waterList}>
            {/* Пример списка */}
            <WaterItem />
        </div>
    );
}

export default WaterList;
