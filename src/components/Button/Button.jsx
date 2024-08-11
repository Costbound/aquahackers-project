import css from "./Button.module.css";
import clsx from "clsx";

const Button = ({
  children,
  onClick,
  styleType,
  className,
  type = "submit",
}) => {
  const handleClick = (e) => {
    e.currentTarget.blur();
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      onClick={handleClick}
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
