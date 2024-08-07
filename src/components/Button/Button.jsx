import css from "./Button.module.css";
import clsx from "clsx";

const Button = ({ children, onClick, styleType, className, type = 'submit' }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(css.button, className && className, {
        [css.transparent]: styleType === "transparent",
        [css.green]: styleType === "green",
        [css.dark]: styleType === "dark",
        [css.white]: styleType === "white",
      })}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;