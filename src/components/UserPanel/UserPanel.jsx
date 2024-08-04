import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/userData/selectors-userData';
import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';

const UserPanel = () => {
    const userName = useSelector(selectUserName);
    const username = userName || 'User';

    return (
        <div className={css.userPanel}>
            <h1 className={css.greeting}>
                Hello<span className={css.panelUsername}>, {username}!</span>
            </h1>
            <UserBar />
        </div>
    );
}

export default UserPanel;
