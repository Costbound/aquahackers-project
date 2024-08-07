import css from './ShowPwdButton.module.css';
import icon from "../../img/icons.svg";

function ShowPwdButton({onClick, isPwdVisible}) {
    return (
        <button type="button" onClick={onClick} className={css.iconButton}>
            {isPwdVisible ? (
                <svg className={css.icon} width='20' height='20'>
                    <use href={`${icon}#icon-eye`}/>
                </svg>
            ) : (
                <svg className={css.icon} width='20' height='20'>
                    <use href={`${icon}#icon-eye-off`}/>
                </svg>
            )}
        </button>
    );
}

export default ShowPwdButton;