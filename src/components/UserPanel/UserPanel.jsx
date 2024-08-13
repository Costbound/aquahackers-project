import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/userData/selectors-userData';
import UserBar from '../UserBar/UserBar';
import css from './UserPanel.module.css';

const UserPanel = () => {
    const userName = useSelector(selectUserName);

    const formatUsername = (username) => {
        // Получаем имя до первого пробела
        let namePart = username.split(' ')[0];
        
        // Если имя длиннее 10 символов, обрезаем его и добавляем три точки
        if (namePart.length > 10) {
            return namePart.slice(0, 10) + '...';
        }

        return namePart;
    };

    return (
        <div className={css.userPanel}>
            <h1 className={css.greeting}>
                Hello<span className={css.panelUsername}>, {formatUsername(userName || 'User')}!</span>
            </h1>
            <UserBar />
        </div>
    );
}

export default UserPanel;
