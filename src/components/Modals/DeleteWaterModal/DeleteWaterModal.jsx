import css from "./DeleteWaterModal.module.css";
// import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

const DeleteWaterModal = () => {
  const handleSubmit = () => {};

  return (
    <div className={css.deleteModalContainer}>
      <AiOutlineClose className={css.deleteModalCloseBtn} />
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
        <button
          className={css.deleteModalCancelBtn}
          // onClick={}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
