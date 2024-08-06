import css from './AddWaterBtn.module.css';
import icon from "../../img/icons.svg";

const AddWaterBtn = () => {
  return (
    <div className={css.addWaterContainer}>
            <button className={css.addWaterButton}>
                <svg className={css.svgIconPlus}>
                    <use href={`${icon}#icon-plus-1`} />
                </svg>
            </button>
            <span className={css.addWaterText}>Add water</span>
        </div>
  )
}

export default AddWaterBtn