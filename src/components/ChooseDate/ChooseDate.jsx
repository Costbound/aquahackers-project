import { useDispatch, useSelector } from 'react-redux';
import css from './ChooseDate.module.css';

const ChooseDate = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.water.selectedDate);

    // Стрелочная функция для форматирования даты
    const formatDate = (date) => {
        const today = new Date().toISOString().split('T')[0];
        const options = { day: 'numeric', month: 'long' };
        const dateObj = new Date(date);
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);

        return date === today ? 'Today' : formattedDate;
    };

    return (
        <div className={css.dateDisplay}>
            <span>{formatDate(selectedDate)}</span>
        </div>
    );
}

export default ChooseDate;
