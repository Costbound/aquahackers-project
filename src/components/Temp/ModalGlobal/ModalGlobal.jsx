import css from './ModalGlobal.module.css'
import Button from "../../Button/Button.jsx";
import {useState} from "react";
import Modal from "../../Modal/Modal.jsx";
import UserSettingsModal from "../../UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../../Modals/LogOutModal/LogOutModal.jsx";

function ModalGlobal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    const handleModalClose = () => {
        setIsModalOpen(false);
        setModalType("");
    }

    const handleOpenSettingsModal = () => {
        setIsModalOpen(true)
        setModalType('settings')
    }

    const handleOpenLogOutModal = () => {
        setIsModalOpen(true)
        setModalType('logOut')
    }


    return (isModalOpen ? (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            {
                modalType === 'logOut' ? <LogOutModal /> :
                    modalType === 'settings' ? <UserSettingsModal /> : null
            }
        </Modal>
        ) : (
        <div className={css.container}>
            <Button styleType='grey' onClick={handleOpenSettingsModal}>Settings</Button>
            <Button styleType='grey' onClick={handleOpenLogOutModal}>Log Out</Button>
        </div>
        )
    );
}

export default ModalGlobal;