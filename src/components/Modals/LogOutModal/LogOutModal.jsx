import css from "./LogOutModal.module.css";
import { apiLogout } from "../../../redux/auth/ops-auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearState } from "../../../redux/auth/slice-auth";
import { useContext } from "react";
import { ModalContext } from "../../Modal/ModalProvider.jsx";

const LogOutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {closeModal} = useContext(ModalContext);

  const handleClick = async () => {
    try {
      await dispatch(apiLogout()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearState());
      localStorage.clear();
      navigate("/");
      closeModal();
    }
  };

  return (
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
  );
};

export default LogOutModal;
