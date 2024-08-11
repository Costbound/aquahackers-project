import { useSelector } from 'react-redux';
import css from './ChooseDate.module.css';
import {selectSelectedDate, selectTodayDate} from '../../redux/water/selectors-water';
// import { setSelectedDate } from '../../redux/water/slice-water';
import namingMonth from '../../helpers/Calendar/namingMonth';

const ChooseDate = () => {
    // const dispatch = useDispatch();
    const date = useSelector(selectSelectedDate); // Получение данных о выбранной дате из состояния Redux
    
    const today = useSelector(selectTodayDate)
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const formattedDate = `${day}, ${namingMonth(month)}`;

    const displayDate = date === today ? "Today" : formattedDate; // Проверка, если выбранная дата совпадает с сегодняшней


    return (
        <div className={css.dateDisplay}>
            <span>{displayDate}</span>
        </div>
    );
}

export default ChooseDate;
