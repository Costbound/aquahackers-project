import { useSelector } from 'react-redux';
import css from './ChooseDate.module.css';
import { selectTodayDate } from '../../redux/water/selectors-water';
import namingMonth from '../../helpers/Calendar/namingMonth';

const ChooseDate = () => {
    const date = useSelector(selectTodayDate); // Получение данных о выбранной дате из состояния Redux
    
    const today = new Date().toISOString().split('T')[0]; // Получение сегодняшней даты в формате "YYYY-MM-DD"
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth(); 
    const formattedDate = `${day}, ${namingMonth(month)}`;

    const displayDate = date === today ? "Today" : formattedDate; // Проверка, если выбранная дата совпадает с сегодняшней

    return (
        <div className={css.dateDisplay}>
            <span>{displayDate}</span>
        </div>
    );
}

export default ChooseDate;
