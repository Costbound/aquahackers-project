import styles from './UserBarPopover.module.css';

const UserBarPopover = () => {
    return (
        <div className={styles.popover}>
            <button className={styles.button}>Settings</button>
            <button className={styles.button}>Logout</button>
        </div>
    );
};

export default UserBarPopover;
