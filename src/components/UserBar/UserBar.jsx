import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../redux/auth/selectors-auth'; 
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';
import userAvatar from '../../img/tracker-page/user.jpg';
import icon from '../../img/icons.svg';

const UserBar = () => {
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const popoverRef = useRef(null);
    const buttonRef = useRef(null);
    const userName = useSelector(selectUsername); 
    const username = userName || 'Guest';

    const togglePopover = () => {
        setPopoverOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (
            popoverRef.current && !popoverRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)
        ) {
            setTimeout(() => {
                setPopoverOpen(false);
            }, 0);
        }
    };

    useEffect(() => {
        if (isPopoverOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopoverOpen]);

    const handleSettingClick = (event) => {
        event.stopPropagation();
        console.log("Settings clicked");
    };

    const handleLogoutClick = (event) => {
        event.stopPropagation();
        console.log("Log out clicked");
    };

    return (
        <div className={css.userBarContainer}>
            <div className={css.userBar}>
                <span className={css.username}>{username}</span>
                <img src={userAvatar} className={css.avatar} alt="User Avatar"/>
                <button onClick={togglePopover} className={css.userButton} ref={buttonRef}>
                    <span>
                        <svg className={css.svgIconChevron}>
                            <use href={`${icon}#icon-${isPopoverOpen ? 'chevron-up' : 'chevron-down'}`} />
                        </svg>
                    </span>
                </button>
            </div>
            {isPopoverOpen && (
                <div ref={popoverRef}>
                    <UserBarPopover
                        onClose={togglePopover}
                        onSettingClick={handleSettingClick}
                        onLogoutClick={handleLogoutClick}
                    />
                </div>
            )}
        </div>
    );
}

export default UserBar;
