import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";

export default function Calendar({ monthDays, activeItem, onItemClick }) {
  return (
    <ul className={css.containter}>
      {monthDays.map((day) => (
        <li className={css.itemContainer} key={day.testId}>
          <CalendarItem
            data={day}
            onClick={onItemClick}
            activeCheck={activeItem}
          />
        </li>
      ))}
    </ul>
  );
}
