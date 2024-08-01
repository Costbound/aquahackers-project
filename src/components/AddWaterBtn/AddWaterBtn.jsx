import css from './AddWaterBtn.module.css';

function AddWaterBtn() {
    const handleClick = () => {
        // Открыть модальное окно WaterModal
    };

    return (
        <button onClick={handleClick} className={css.addWaterBtn}>
            Add water
        </button>
    );
}

export default AddWaterBtn;
