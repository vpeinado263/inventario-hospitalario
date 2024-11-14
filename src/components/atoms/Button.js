import styles from "@/styles/Button.module.css";

const Button = ({ label, onClick, type}) => {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
