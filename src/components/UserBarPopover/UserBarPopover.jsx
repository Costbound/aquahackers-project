import css from './UserBarPopover.module.css';
import icon from '../../img/icons.svg';

function UserBarPopover({ onClose }) {
    return (
        <div className={css.popover}>
            <button className={css.popoverButtonSettings} onClick={onClose}>
                Settings
            </button>
            <button className={css.popoverButtonLogout} onClick={onClose}>
                Log out
            </button>
        </div>
    );
}

export default UserBarPopover;
