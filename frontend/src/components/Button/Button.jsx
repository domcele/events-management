import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ onClick, children, color }) => {
  const buttonClassName = `${styles.button} ${styles[color]}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "alert"]).isRequired,
};

export default Button;
