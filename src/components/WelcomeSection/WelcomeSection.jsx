import { NavLink } from "react-router-dom";
import css from "./WelcomeSection.module.css";

export const WelcomeSection = () => {
  return (
    <div className={css.welcomeSection}>

      <p className={css.text}>Record daily water intake and track</p>

      <h1 className={css.title}>Water consumption tracker</h1>

      <div className={css.linkBox}>

        <NavLink to="/signup" className={css.linkSignUP}>

          Try tracker
        </NavLink>
        <NavLink to="/signin" className={css.linkSignIn}>
        
          Sign In
        </NavLink>
      </div>
    </div>
  );
};
