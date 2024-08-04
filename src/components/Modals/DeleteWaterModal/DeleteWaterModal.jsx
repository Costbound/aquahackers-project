import Modal from "../../Modal/Modal.jsx";
import css from "./DeleteWaterModal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const DeleteWaterModal = ({ isOpen, onClose }) => {
  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.deleteModalContainer}>
        <AiOutlineClose className={css.deleteModalCloseBtn} onClick={onClose} />
        <div className={css.deleteModalTextContainer}>
          <h2 className={css.deleteModalTitle}>Delete entry</h2>
          <p className={css.deleteModalText}>
            Are you sure you want to delete the entry?
          </p>
        </div>
        <div className={css.deleteModalBtnWrapper}>
          <button className={css.deleteModalBtn} onClick={handleSubmit}>
            Delete
          </button>
          <button className={css.deleteModalCancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
