import css from './UserBarPopover.module.css';
import icon from '../../img/icons.svg';

function UserBarPopover({ onClose, onSettingClick, onLogoutClick }) {
    return (
        <div className={css.popover}>
            <button className={css.popoverButtonSetting} onClick={onSettingClick}>
                <svg className={css.svgIconSetting}>
                    <use href={`${icon}#icon-settings`} />
                </svg>
                Setting
            </button>
            <button className={css.popoverButtonLogout} onClick={onLogoutClick}>
                <svg className={css.svgIconLogout}>
                    <use href={`${icon}#icon-log-out`} />
                </svg>
                Log out
            </button>
        </div>
    );
}

export default UserBarPopover;
