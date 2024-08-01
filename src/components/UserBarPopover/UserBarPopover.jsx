import css from './UserBarPopover.module.css';

function UserBarPopover({ onClose }) {
    return (
        <div className={css.popover}>
            <button className={css.popoverButton} onClick={onClose}>
                Settings
            </button>
            <button className={css.popoverButton} onClick={onClose}>
                Log out
            </button>
        </div>
    );
}

export default UserBarPopover;
