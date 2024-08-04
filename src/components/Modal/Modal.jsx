import css from "./Modal.module.css";
import icon from "../../img/icons.svg";
import { useEffect, useRef } from "react";

const Modal = ({ children, isOpen, onClose }) => {
  const modalRef = useRef(null);

  const handleContainerClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.modalContainer} onClick={handleContainerClick}>
      <div className={css.modal} ref={modalRef}>
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
