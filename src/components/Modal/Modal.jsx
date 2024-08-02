import css from "./Modal.module.css";
import icon from "../../img/icons.svg";

const Modal = ({ children, onClose }) => {
  return (
    <div className={css.modalContainer}>
      <div className={css.modal}>
        <button className={css.button} onClick={() => onClose(false)}>
          <svg className={css.svgIcon}>
            <use href={`${icon}#icon-close`} />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
