import css from "./UserBarPopover.module.css";
import icon from "../../img/icons.svg";
import { useContext } from 'react';
import { ModalContext } from "../Modal/ModalProvider.jsx";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../Modals/LogOutModal/LogOutModal.jsx";
import Button from '../../components/Button/Button.jsx'

const UserBarPopover = () => {
  const { openModal } = useContext(ModalContext);
  
  const handleModalSettingOpen = () => {
    openModal(< UserSettingsModal />);
  };

  const handleModalLogoutOpen = () => {
    openModal(<LogOutModal />);
  };

  return (
    <div className={css.popover}>
      <Button
        className={css.popoverButtonSetting}
        type="button"
        onClick={handleModalSettingOpen}
      >
          <svg className={css.svgIconSetting}>
            <use href={`${icon}#icon-settings`} />
          </svg>
          Setting
      </Button>
      <Button
        className={css.popoverButtonLogout}
        type="button"
        onClick={handleModalLogoutOpen}
      >
          <svg className={css.svgIconLogout}>
            <use href={`${icon}#icon-log-out`} />
          </svg>
          Log out
        </Button>
      </div>
  );
}

export default UserBarPopover;
