import { useSelector } from "react-redux";
import { selectUserName } from "../../redux/userData/selectors-userData";
import UserBar from "../UserBar/UserBar";
import css from "./UserPanel.module.css";
import { useMediaQuery } from "react-responsive";

const UserPanel = () => {
  const userName = useSelector(selectUserName);

  // Определение размеров экрана
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  // Определение предела длины имени в зависимости от размера экрана
  let maxLength = 18;
  if (isMobile) maxLength = 10;
  else if (isTablet) maxLength = 16;
  else if (isDesktop) maxLength = 14;

  // Обрезаем имя, если оно превышает установленный лимит
  const truncatedUsername =
    userName && userName.length > maxLength
      ? `${userName.substring(0, maxLength)}...`
      : userName || "User";

  return (
    <div className={css.userPanel}>
      <h1 className={css.greeting}>
        Hello<span className={css.panelUsername}>, {truncatedUsername}!</span>
      </h1>
      <UserBar />
    </div>
  );
};

export default UserPanel;
