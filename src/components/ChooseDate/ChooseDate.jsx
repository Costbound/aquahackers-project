import { useState, useEffect } from 'react';
import css from './ChooseDate.module.css';

function ChooseDate() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        // Форматируем текущую дату в формат YYYY-MM-DD
        const formattedDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedDate);
    }, []);

    return (
        <div className={css.dateDisplay}>
            <span>Today: </span>{currentDate}
        </div>
    );
}

export default ChooseDate;
