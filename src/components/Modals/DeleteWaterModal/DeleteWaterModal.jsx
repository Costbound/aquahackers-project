import { useDispatch } from "react-redux";
import { deleteWater, fetchWater } from "../../../redux/water/ops-water";
import css from "./DeleteWaterModal.module.css";
import toast from "react-hot-toast";

// const DeleteWaterModal = ({ onClose }) => {
//   const handleSubmit = () => {
//     onClose();
const DeleteWaterModal = ({ waterId, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteWater(waterId))
      .unwrap()
      .then(() => {
        dispatch(fetchWater())
          .unwrap()
          .then(() => {
            toast.success("Delete successfull!", {
              duration: 5000,
            });
          })
          .catch(() => {
            toast.error("Failed to refresh data after deletion!");
          });
      })
      .catch(() => {
        toast.error("Oops, delete went wrong, please try again!");
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <div className={css.deleteModalContainer}>
      <div className={css.deleteModalTextContainer}>
        <h2 className={css.deleteModalTitle}>Delete entry</h2>
        <p className={css.deleteModalText}>
          Are you sure you want to delete the entry?
        </p>
      </div>
      <div className={css.deleteModalBtnWrapper}>
        <button className={css.deleteModalBtn} onClick={handleDelete}>
          Delete
        </button>
        <button className={css.deleteModalCancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
