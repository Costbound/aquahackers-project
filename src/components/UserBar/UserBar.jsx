import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/userData/selectors-userData';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import { selectUserAvatar } from '../../redux/userData/selectors-userData';
import css from './UserBar.module.css';
import miniAvatar from '../../img/mini-avatar.jpg';
import icon from '../../img/icons.svg';

const UserBar = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const user = useSelector(selectUserAvatar);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const userName = useSelector(selectUserName);
  
  const truncatedUsername = userName && userName.length > 6
    ? `${userName.substring(0, 6)}...`
    : userName || 'User';

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

  return (
    <div className={css.userBarContainer}>
      <button onClick={togglePopover} className={css.userBar} ref={buttonRef}>
        <span className={css.barUsername}>{truncatedUsername}</span>
        <img className={css.avatar} src={user || miniAvatar} alt="Avatar" />
        <span className={css.userChevron}>
          <svg className={css.svgIconChevron}>
            <use href={`${icon}#icon-${isPopoverOpen ? 'chevron-up' : 'chevron-down'}`} />
          </svg>
        </span>
      </button>
      {isPopoverOpen && (
        <div ref={popoverRef}>
          <UserBarPopover />
        </div>
      )}
    </div>
  );
}

export default UserBar;
