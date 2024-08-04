import PropTypes from "prop-types";

const Button = ({
  children,
  width,
  height,
  border,
  backgroundColor,
  color,
  fontSize,
  onClick,
}) => {
  const buttonStyle = {
    width: width || "auto",
    height: height || "auto",
    backgroundColor: backgroundColor || "#f0eff4",
    border: border || "none",
    borderRadius: "30px",
    color: color || "#323f47",
    cursor: "pointer",
    fontFamily: "Poppins, sans-serif",
    fontSize: fontSize || "16px",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontSize: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
