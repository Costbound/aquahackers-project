import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../redux/auth/selectors-auth'; 
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';
import userAvatar from '../../img/tracker-page/user.jpg';
import icon from "../../img/icons.svg";

const UserBar = () => {
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const userName = useSelector(selectUsername); 
    const username = userName || 'Guest';

    const togglePopover = () => {
        setPopoverOpen(prevState => !prevState);
    };

    return (
        <div className={css.userBarContainer}>
            <div className={css.userBar}>
                <span className={css.username}>{username}</span>
                <img src={userAvatar} className={css.avatar} alt="User Avatar"/>
                <button onClick={togglePopover} className={css.userButton}>
                    <span>
                        <svg className={css.svgIconChevron}>
                            <use href={`${icon}#icon-${isPopoverOpen ? 'chevron-down' : 'chevron-up'}`} />
                        </svg>
                    </span>
                </button>
            </div>
            {isPopoverOpen && <UserBarPopover onClose={togglePopover} />}
        </div>
    );
}

export default UserBar;
