import css from './FormValidateError.module.css';

export const FormValidateError = ({ message }) => {
  return <p className={css.text}>{message}</p>;
};