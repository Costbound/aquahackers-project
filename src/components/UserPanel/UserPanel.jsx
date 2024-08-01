import styles from './UserPanel.module.css';

const UserPanel = () => {
    return (
        <div className={styles.userPanel}>
            <h2 className={styles.username}>Hello, Nadia!</h2>
        </div>
    );
};

export default UserPanel;
