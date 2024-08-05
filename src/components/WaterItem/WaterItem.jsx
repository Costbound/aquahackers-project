//WaterItem.jsx
import PropTypes from 'prop-types';
import css from './WaterItem.module.css'; 
import icon from "../../img/icons.svg";
import Modal from '../Modal/Modal';
import DeleteWaterModal from '../Modals/DeleteWaterModal/DeleteWaterModal';
import { useState } from 'react';

const WaterItem = ({ amount, time, onEdit }) => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const deleteModal = (<DeleteWaterModal onClose={() => setDeleteModalOpen(false)}/>);
    const handleEdit = () => {
        onEdit();
    };

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    return (
        <>
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
            <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DeleteWaterModal onClose={() => setDeleteModalOpen(false)}/>
            </Modal>
        </>

        
    );
};

WaterItem.propTypes = {
    amount: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default WaterItem;
