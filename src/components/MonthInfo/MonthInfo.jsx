import { useEffect, useRef, useState } from "react";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import css from "./MonthInfo.module.css";
import {
  selectedMonth,
  selectedMonthDays,
  selectedYear,
} from "../../redux/water/selectors-water";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonth } from "../../redux/water/ops-water";
import Loader from "../Loader/Loader";

export default function MonthInfo() {
  const [month, setMonth] = useState(useSelector(selectedMonth));
  const [year, setYear] = useState(useSelector(selectedYear));
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const date = useRef(null);

  const monthDays = useSelector(selectedMonthDays);

  useEffect(() => {
    const loadingToggle = async () => {
      setIsLoading(true);
      await dispatch(fetchMonth({ year, month }));
      setIsLoading(false);
    };
    loadingToggle();
  }, [dispatch, year, month]);

  const previousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {
    if (date.current !== null) {
      dateInMonthCheck();
    }
  });

  // Якщо обрати день та змінити місяць має зберегтися обрана дата, при зміні місяця
  // спрацьовує ця функція, тому щоб одразу витягувало інформацію про ту саму дату але
  // в новому місяці, потрібно додати функцію і сюди. Її потрібно буде додати 2 рази
  // Ці два рази я виділив та описав далі.
  const dateInMonthCheck = () => {
    if (monthDays.some((item) => item.date.slice(-2) === date.current)) {
      const tempDateId = monthDays.find(
        (item) => item.date.slice(-2) === date.current
      ).date;
      setActiveItem(tempDateId);
      // id дня це tempDateId - Функцію потрібно буде додати сюди
    } else {
      const tempDateId = monthDays.find(
        (item) => item.date.slice(-2) == monthDays.length
      ).date;
      setActiveItem(tempDateId);
      date.current = tempDateId.slice(-2);
      // id дня це tempDateId - Функцію потрібно буде додати сюди
    }
  };

  // Функція кліку на день
  // data - це повна інформація по дню для тесту можна використати
  // console.log(data) - в самій функціїї
  // id дня це data.date
  const onItemClick = async (data) => {
    setActiveItem(data.date);
    date.current = data.date.slice(-2);
  };

  return (
    <div className={css.container}>
      <CalendarPagination
        month={month}
        year={year}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />
      {isLoading ? (
        <div className={css.loader}>
          <Loader />
        </div>
      ) : (
        <Calendar
          monthDays={monthDays}
          activeItem={activeItem}
          onItemClick={onItemClick}
        />
      )}
    </div>
  );
}
