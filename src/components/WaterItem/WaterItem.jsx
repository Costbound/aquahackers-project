import css from './WaterItem.module.css';

function WaterItem() {
    const handleEdit = () => {
        // Открыть модальное окно WaterModal
    };

    const handleDelete = () => {
        // Открыть модальное окно DeleteWaterModal
    };

    return (
        <div className={css.waterItem}>
            <span>Water Amount</span>
            <span>Time</span>
            <button onClick={handleEdit}>✎</button>
            <button onClick={handleDelete}>🗑️</button>
        </div>
    );
}

export default WaterItem;
