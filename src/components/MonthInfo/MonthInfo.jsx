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

//Testing list
// import { list } from "./testList";

export default function MonthInfo() {
  const [month, setMonth] = useState(useSelector(selectedMonth));
  const [year, setYear] = useState(useSelector(selectedYear));
  const [activeItem, setActiveItem] = useState(null);
  const dispatch = useDispatch();

  const date = useRef(null);

  //Testing list
  // const monthDays = list[month];

  const monthDays = useDispatch(useSelector(selectedMonthDays));
  console.log(monthDays);

  useEffect(() => {
    dispatch(fetchMonth({ year, month }));
  }, [dispatch, month, year]);

  const previousMonth = () => {
    if (month === 0) {
      setMonth(() => {
        // date.current === null ? "" : dateInMonthCheck([11]);
        return 11;
      });
      setYear(year - 1);
    } else {
      setMonth(() => {
        // date.current === null ? "" : dateInMonthCheck([month - 1]);
        return month - 1;
      });
    }
    dispatch(fetchMonth({ year, month }));
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(() => {
        // date.current === null ? "" : dateInMonthCheck([0]);
        return 0;
      });
      setYear(year + 1);
    } else {
      setMonth(() => {
        // date.current === null ? "" : dateInMonthCheck([month + 1]);
        return month + 1;
      });
    }
    dispatch(fetchMonth({ year, month }));
  };

  // const dateInMonthCheck = (changingMonth) => {
  //   if (
  //     list[changingMonth].some((item) => item.number === date.current.number)
  //   ) {
  //     setActiveItem(
  //       list[changingMonth].find((item) => item.number === date.current.number)
  //         .testId
  //     );
  //   } else {
  //     const tempDate = list[changingMonth].find(
  //       (item) => item.number == list[changingMonth].length
  //     );
  //     setActiveItem(tempDate.testId);
  //     date.current = tempDate;
  //   }
  // };

  const onItemClick = async (data) => {
    setActiveItem(data.testId);
    date.current = data;
  };

  return (
    <div className={css.container}>
      <CalendarPagination
        month={month}
        year={year}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />
      <Calendar
        monthDays={monthDays}
        activeItem={activeItem}
        onItemClick={onItemClick}
      />
    </div>
  );
}
