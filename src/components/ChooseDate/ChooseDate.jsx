import { useSelector } from 'react-redux';
import css from './ChooseDate.module.css';
import { selectSelectedDate } from '../../redux/water/selectors-water';
// import { setSelectedDate } from '../../redux/water/slice-water';
import namingMonth from '../../helpers/Calendar/namingMonth';

const ChooseDate = () => {
    // const dispatch = useDispatch();
    const date = useSelector(selectSelectedDate); // Получение данных о выбранной дате из состояния Redux
    
    const today = new Date().toISOString().split('T')[0];
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1; //делает +1 для месяца
    const formattedDate = `${day}, ${namingMonth(month)}`;

    const displayDate = date === today ? "Today" : formattedDate; // Проверка, если выбранная дата совпадает с сегодняшней


    return (
        <div className={css.dateDisplay}>
            <span>{displayDate}</span>
        </div>
    );
}

export default ChooseDate;
