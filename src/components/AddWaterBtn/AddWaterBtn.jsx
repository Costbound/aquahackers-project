import css from './AddWaterBtn.module.css';
import icon from '../../img/icons.svg';
import Button from '../../components/Button/Button.jsx'
import Modal from '../Modal/Modal.jsx';
import {useContext, useState} from 'react';
import {ModalContext} from "../Modal/ModalProvider.jsx";
import WaterModal from "../WaterModal/WaterModal.jsx";

export default function AddWaterBtn() {
    // const [isModalOpen, settIsModalOpen] = useState(false);
    const {openModal} = useContext(ModalContext)

    const handleModalOpen = () => {
        const content = (
            <WaterModal type='add' />
        )
        openModal('asfasfasfasfasfasfasfasfasfasfasfas')
    }

    // const openModal = () => settIsModalOpen(true);
    // const closeModal = () => settIsModalOpen(false);
    return (
       < >
       <Button
            className={css.addButton}
            type='button' 
            styleType={"dark"}
            onClick={handleModalOpen}>
             <svg className={css.svgIconAdd}>
                    <use href={`${icon}#icon-plus-1`} />
            </svg>Add water
        </Button >
       </>
    )
};

