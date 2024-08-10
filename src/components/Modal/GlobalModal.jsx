import Modal from "./Modal.jsx";
import {useContext} from "react";
import {ModalContext} from "./ModalProvider.jsx";

function GlobalModal() {
    const {isModalOpen, modalContent} = useContext(ModalContext)

    return (
        isModalOpen ? (
            <Modal>
                {modalContent}
            </Modal>
        ) : null
    );
}

export default GlobalModal;