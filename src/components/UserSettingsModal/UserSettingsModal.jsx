import { UserSettingsForm } from "../UserSettingsForm/UserSettingsForm.jsx";
import css from "./UserSettingsModal.module.css";
const UserSettingsModal = () => {
  return (
    <div className={css.wrapper}>
      <p className={css.title}>Setting</p>
      <UserSettingsForm></UserSettingsForm>
    </div>
  );
};

export default UserSettingsModal;
