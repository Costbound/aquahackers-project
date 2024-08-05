import PropTypes from 'prop-types';
import css from './WaterItem.module.css';
import icon from "../../img/icons.svg";

const WaterItem = ({ amount, time, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit();
    };

    const handleDelete = () => {
        onDelete();
    };

    return (
    <div className={css.waterItemContainer}>
            <svg className={css.svgIconWater}>
                <use href={`${icon}#icon-glass-of-water`} />
            </svg>
        <div className={css.waterInfo}>
            <span className={css.amount}>{amount} ml</span>
            <span className={css.time}>{time}</span> 
        </div>
        <div className={css.actionButtons}>
            <button onClick={handleEdit} className={css.editButton}>
                <svg className={css.svgIconPencil}>
                    <use href={`${icon}#icon-pencil`} />
                </svg>
            </button>
            <button onClick={handleDelete} className={css.deleteButton}>
                <svg className={css.svgIconBin}>
                    <use href={`${icon}#icon-bin`} />
                </svg>
            </button>   
        </div>
    </div>
    );
};

WaterItem.propTypes = {
    amount: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default WaterItem;
