import css from "./UserBarPopover.module.css";
import icon from "../../img/icons.svg";
import { useDispatch } from "react-redux";
import { changeLogoutModalOpen, changeSettingsModalOpen } from "../../redux/water/slice-water";

const UserBarPopover = () => {
const dispatch = useDispatch();

  const handleOpenLogOutModal = () => {
    dispatch(changeLogoutModalOpen(true));
  };

  const handleOpenSettingsModal = () => {
    dispatch(changeSettingsModalOpen(true));
  };

  return (
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
  );
}

export default UserBarPopover;
