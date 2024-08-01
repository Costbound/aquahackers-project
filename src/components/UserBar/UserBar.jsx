import  { useState } from 'react';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import styles from './UserBar.module.css';

const UserBar = () => {
    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => setShowPopover(!showPopover);

    return (
        <div className={styles.userBar} onClick={togglePopover}>
            <span className={styles.username}>Nadia</span>
            <img src="path/to/avatar.png" alt="User Avatar" className={styles.avatar} />
            {showPopover && <UserBarPopover />}
        </div>
    );
};

export default UserBar;
