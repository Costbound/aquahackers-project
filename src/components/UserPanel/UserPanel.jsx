import { useSelector } from 'react-redux';
import { selectUsername } from '../../redux/auth/selectors-auth';
import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';

const UserPanel = () => {
    const userName = useSelector(selectUsername);
    const username = userName || 'Guest';

    return (
        <div className={css.panel}>
            <h1 className={css.greeting}>
                Hello<span className={css.username}>, {username}!</span>
            </h1>
            <UserBar />
        </div>
    );
}

export default UserPanel;
