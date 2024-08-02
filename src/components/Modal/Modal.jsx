import css from "./Modal.module.css";
import icon from "../../img/icons.svg";
import { useEffect } from "react";

const Modal = ({ children, isOpen, onClose }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  if (!isOpen) return null;

  return (
    <div className={css.modalContainer} onClick={onClose}>
      <div className={css.modal}>
        <button className={css.button} onClick={onClose}>
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
