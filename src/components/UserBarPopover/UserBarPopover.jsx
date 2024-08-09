import { useState } from "react";
import css from "./UserBarPopover.module.css";
import icon from "../../img/icons.svg";
import Modal from "../Modal/Modal";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import LogOutModal from "../Modals/LogOutModal/LogOutModal";

const UserBarPopover = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType("");
  }

  const handleOpenSettingsModal = () => {
    setIsModalOpen(true);
    setModalType('settings');
  }

  const handleOpenLogOutModal = () => {
    setIsModalOpen(true);
    setModalType('logOut');
  }

  return (
    <div>
      <div className={css.popover}>
        <button className={css.popoverButtonSetting} onClick={handleOpenSettingsModal}>
          <svg className={css.svgIconSetting}>
            <use href={`${icon}#icon-settings`} />
          </svg>
          Setting
        </button>
        <button className={css.popoverButtonLogout} onClick={handleOpenLogOutModal}>
          <svg className={css.svgIconLogout}>
            <use href={`${icon}#icon-log-out`} />
          </svg>
          Log out
        </button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          {
            modalType === 'logOut' ? <LogOutModal onClose={handleModalClose} /> :
            modalType === 'settings' ? <UserSettingsModal onClose={handleModalClose}/> : null
          }
        </Modal>
      )}
    </div>
  );
}

export default UserBarPopover;
