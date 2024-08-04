import { useState } from "react";
import css from "./LogOutModal.module.css";
import Modal from "../../Modal/Modal";

const LogOutModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // поменять на true

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = () => {
    // Логика выхода
    closeModal();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className={css.logoutModalContainer}>
        <div className={css.logoutModalTextContainer}>
          <h2 className={css.logoutModalTitle}>Log out</h2>
          <p className={css.logoutModalText}>Do you really want to leave?</p>
        </div>
        <div className={css.logoutModalBtnWrapper}>
          <button className={css.logoutModalBtn} onClick={handleClick}>
            Log out
          </button>
          <button className={css.logoutModalCancelBtn} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
