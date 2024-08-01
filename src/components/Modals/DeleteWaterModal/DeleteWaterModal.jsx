import css from "./DeleteWaterModal.module.css";
// import toast from "react-hot-toast";

const DeleteWaterModal = () => {
  const handleSubmit = () => {};

  return (
    <div className={css.deleteModalContainer}>
      <div className={css.deleteModalTextContainer}>
        <h2 className={css.deleteModalTitle}>Delete entry</h2>
        <p className={css.deleteModalText}>
          Are you sure you want to delete the entry?
        </p>
      </div>

      <div className={css.btnWrap}>
        <button className={css.btn} onClick={handleSubmit}>
          Delete
        </button>
        <button
          className={css.cancelBtn}
          // onClick={}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
