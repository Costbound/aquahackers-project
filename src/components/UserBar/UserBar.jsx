import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsername } from '../../redux/auth/selectors-auth'; // Убедитесь, что путь правильный
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';

function UserBar() {
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const userName = useSelector(selectUsername); // Получаем имя пользователя из Redux

    const togglePopover = () => setPopoverOpen(!isPopoverOpen);

    return (
        <div className={css.userBar}>
            <div className={css.userInfo}>
                <img src="user-avatar.jpg" alt="User Avatar" className={css.avatar} />
                <span className={css.userName}>{userName || 'Guest'}</span>
                <button className={css.menuButton} onClick={togglePopover}>
                    {/* Используем иконку или текст для кнопки */}
                    ☰
                </button>
            </div>
            {isPopoverOpen && <UserBarPopover onClose={togglePopover} />}
        </div>
    );
}

export default UserBar;
