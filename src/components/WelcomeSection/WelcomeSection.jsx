import { NavLink } from "react-router-dom";
import css from "./WelcomeSection.module.css";
import Logo from "../Logo/Logo.jsx";
import SectionWithLogo from "../SectionWithLogo/SectionWithLogo.jsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors-auth.js";

export const WelcomeSection = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // Проверка состояния авторизации

  return (
    <SectionWithLogo className={css.welcomeSection}>
      <h2 className={css.text}>Record daily water intake and track</h2>

      <h1 className={css.title}>Water consumption tracker</h1>

      <div className={css.linkBox}>
        <NavLink to="/signup" className={css.linkSignUP}>
          Try tracker
        </NavLink>
        <NavLink
          to="/signin"
          className={`${css.linkSignIn} ${isLoggedIn ? css.disabledLink : ""}`}
          aria-disabled={isLoggedIn}
          tabIndex={isLoggedIn ? -1 : 0}
        >
          Sign In
        </NavLink>
      </div>
    </SectionWithLogo>
  );
};
