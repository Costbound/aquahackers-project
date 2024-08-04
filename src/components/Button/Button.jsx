import PropTypes from "prop-types";
import css from "./Button.module.css";
import clsx from "clsx";

const Button = ({ children, width, height, onClick, styleType }) => {
  const buttonStyle = {
    width: width || "auto",
    height: height || "auto",
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      className={clsx(css.button, {
        [css.transparent]: styleType === "transparent",
        [css.green]: styleType === "green",
        [css.dark]: styleType === "dark",
        [css.white]: styleType === "white",
      })}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
  styleType: PropTypes.oneOf(["transparent", "dark", "green", "white"]),
};

export default Button;
