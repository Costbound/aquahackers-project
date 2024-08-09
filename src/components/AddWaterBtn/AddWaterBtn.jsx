import css from './AddWaterBtn.module.css';
import icon from '../../img/icons.svg';
import Button from '../../components/Button/Button.jsx'
import Modal from '../Modal/Modal.jsx';
import { useState } from 'react';

export default function AddWaterBtn() {
    const [isModalOpen, settIsModalOpen] = useState(false);

    const openModal = () => settIsModalOpen(true);
    const closeModal = () => settIsModalOpen(false);
    return (
       < >
       <Button
            className={css.addButton}
            type='button' 
            styleType={"dark"}
            onClick={openModal}>
             <svg className={css.svgIconAdd}>
                    <use href={`${icon}#icon-plus-1`} />
            </svg>Add water
        </Button >
        <Modal isOpen={isModalOpen} onClose={closeModal}><p>AddModal</p></Modal>
       </>
    )
};

