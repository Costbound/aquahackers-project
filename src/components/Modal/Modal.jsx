import css from "./Modal.module.css";
import icon from "../../img/icons.svg";
import {useContext, useEffect, useRef} from "react";
import {ModalContext} from "./ModalProvider.jsx";

const Modal = ({ children }) => {
  const modalRef = useRef(null);
  const {closeModal} = useContext(ModalContext)

  const handleContainerClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={css.modalContainer} onClick={handleContainerClick}>
      <div className={css.modal} ref={modalRef}>
        <button className={css.button} onClick={closeModal}>
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
