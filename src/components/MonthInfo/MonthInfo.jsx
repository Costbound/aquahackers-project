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


import { setSelectedDate } from "../../redux/water/slice-water"; // Импортируем action
import { useNavigate } from "react-router";
import { setShowChart } from "../../redux/chart/slice";
import ChartComponent from "../Statistics/ChartComponent";
import getTodayDate from "../../helpers/getTodayDate";


export default function MonthInfo() {
  const todayDate = getTodayDate();

  const [month, setMonth] = useState(useSelector(selectedMonth));
  const [year, setYear] = useState(useSelector(selectedYear));
  const [activeItem, setActiveItem] = useState(todayDate);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const date = useRef(todayDate.slice(-2));
  const monthDays = useSelector(selectedMonthDays);

  useEffect(() => {
    const loadingToggle = () => {
      setIsLoading(true);
      dispatch(fetchMonth({ year, month }));
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

  const dateInMonthCheck = () => {
    if (monthDays && monthDays.length > 0) {
      if (monthDays.some((item) => item.date.slice(-2) === date.current)) {
        const tempDateId = monthDays.find(
          (item) => item.date.slice(-2) === date.current
        ).date;
        setActiveItem(tempDateId);
        dispatch(setSelectedDate(tempDateId));
      } else {
        const tempDateId = monthDays.find(
          (item) => item.date.slice(-2) == monthDays.length
        ).date;
        setActiveItem(tempDateId);
        date.current = tempDateId.slice(-2);
        dispatch(setSelectedDate(tempDateId));
      }
    }
  };

  const onItemClick = (data) => {
    setActiveItem(data.date);
    date.current = data.date.slice(-2);
    dispatch(setSelectedDate(data.date));
  };

  const showChart = useSelector((state) => state.chart.showChart);
  const navigate = useNavigate();

  const handleIconClick = () => {
    const newShowChart = !showChart;
    dispatch(setShowChart(newShowChart));
    if (newShowChart) {
      navigate("/tracker/statistics");
    } else {
      navigate("/tracker");
    }
  };

  return (
    <div className={css.container}>
      <CalendarPagination
        month={month}
        year={year}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
        handleIconClick={handleIconClick}
        showChart={showChart}
      />
      {isLoading ? (
        <div className={css.loader}>
          <Loader />
        </div>
      ) : showChart ? (
        <ChartComponent />
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
