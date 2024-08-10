import { useState } from "react";

export default () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => {
        if (content) {
            setIsModalOpen(true);
            setModalContent(content);
        } else {
            console.log('You must put jsx content as an argument')
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return {isModalOpen, openModal, closeModal, modalContent}
}