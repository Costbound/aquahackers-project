import PropTypes from 'prop-types';
import css from './WaterItem.module.css';

const WaterItem = ({ amount, time, onEdit, onDelete }) => {
    const handleEdit = () => {
        onEdit();
    };

    const handleDelete = () => {
        onDelete();
    };

    return (
        <div className={css.waterItemContainer}>
            <div className={css.waterInfo}>
                <span className={css.amount}>{amount} ml</span>
                <span className={css.time}>{time}</span> 
            </div>
            <div className={css.actionButtons}>
                <button onClick={handleEdit} className={css.editButton}>✎</button>
                <button onClick={handleDelete} className={css.deleteButton}>🗑️</button>   
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
