import { UserSettingsForm } from "../UserSettingsForm/UserSettingsFormTemp.jsx";
import css from "./UserSettingsModal.module.css";

const UserSettingsModal = ({onClose}) => {
  return (
    <div className={css.wrapper}>
      <p className={css.title}>Settings</p>
      <UserSettingsForm onClose={onClose}></UserSettingsForm>
    </div>
  );
};

export default UserSettingsModal;
