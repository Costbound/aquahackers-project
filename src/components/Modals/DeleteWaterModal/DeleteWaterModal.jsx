import { useDispatch } from "react-redux";
import { deleteWater } from "../../../redux/water/ops-water";
import css from "./DeleteWaterModal.module.css";
import toast from "react-hot-toast";
import {useContext} from "react";
import {ModalContext} from "../../Modal/ModalProvider.jsx";


const DeleteWaterModal = ({ waterId }) => {
  const dispatch = useDispatch();
  const {closeModal} = useContext(ModalContext)

const handleDelete = async () => {
    await dispatch(deleteWater(waterId))
    closeModal();
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
        <button className={css.deleteModalCancelBtn} onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
