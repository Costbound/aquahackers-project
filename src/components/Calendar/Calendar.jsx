import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";

export default function Calendar({ monthDays, activeItem, onItemClick }) {
  return (
    <ul className={css.containter}>
      {monthDays.map((day, index) => (
        <li className={css.itemContainer} key={day.date}>
          <CalendarItem
            data={day}
            date={index + 1}
            onClick={onItemClick}
            activeCheck={activeItem}
          />
        </li>
      ))}
    </ul>
  );
}
