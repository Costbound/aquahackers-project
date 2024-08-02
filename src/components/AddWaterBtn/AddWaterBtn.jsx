// src/components/AddWaterBtn/AddWaterBtn.jsx
import css from './AddWaterBtn.module.css';

const AddWaterBtn = ({ onAddWater }) => {
    return (
        <div className={css.addContainer}>
            <button onClick={onAddWater} className={css.addButton}>
                +
            </button>
            <span className={css.addText}>Add water</span>
        </div>
    );
}

export default AddWaterBtn;
