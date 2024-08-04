import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/userData/selectors-userData'; // Импортируйте селектор из userData
import UserBarPopover from '../UserBarPopover/UserBarPopover';

// import SettingsModal from '../SettingsModal/SettingsModal';- пример того как мне будет подсоединены модальные окна и я их буду использовать
// import LogoutModal from '../LogoutModal/LogoutModal';

import css from './UserBar.module.css';
import userAvatar from '../../img/tracker-page/user.jpg';
import icon from '../../img/icons.svg';

const UserBar = () => {
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    // const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);- пример открытия модальных окон
    // const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const popoverRef = useRef(null);
    const buttonRef = useRef(null);
    const userName = useSelector(selectUserName);
    const username = userName || 'User';

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

    // const handleSettingClick = (event) => {
    //     event.stopPropagation();
    //     setPopoverOpen(false);
    //     setSettingsModalOpen(true);
    // };

    // const handleLogoutClick = (event) => {
    //     event.stopPropagation();
    //     setPopoverOpen(false);        логика открытия и закрытия модальных окон по клику
    //     setLogoutModalOpen(true);
    // };

    // const closeSettingsModal = () => {
    //     setSettingsModalOpen(false);
    // };

    // const closeLogoutModal = () => {
    //     setLogoutModalOpen(false);
    // };

    return (
        <div className={css.userBarContainer}>
            <div className={css.userBar}>
                <span className={css.barUsername}>{username}</span>
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
                        // onSettingClick={handleSettingClick}
                        // onLogoutClick={handleLogoutClick}   добавление в USerBarPopover функций
                    />
                </div>
            )}
        </div>
    );
}

export default UserBar;
