
import Modal from "./Modal.jsx";
import {useContext} from "react";
import {ModalContext} from "./ModalProvider.jsx";

function GlobalModal() {
    const {isModalOpen, closeModal, modalContent} = useContext(ModalContext)

    return (
        <Modal isopen={isModalOpen} onClose={closeModal}>
            {modalContent}
        </Modal>
    );
}

export default GlobalModal;