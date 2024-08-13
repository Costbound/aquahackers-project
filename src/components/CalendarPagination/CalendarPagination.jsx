import css from "./CalendarPagination.module.css";
import namingMonth from "../../helpers/Calendar/namingMonth";
import icons from "../../img/icons.svg";
import { selectorIsLoading } from "../../redux/water/selectors-water";
import { useSelector } from "react-redux";

export default function CalendarPagination({
  month,
  year,
  onPreviousMonth,
  onNextMonth,
  handleIconClick,
  showChart,
}) {
  const namedMonth = namingMonth(month);
  const isLoading = useSelector(selectorIsLoading);

  return (
    <div className={css.container}>
      {!showChart ? (
        <h3 className={css.title}>Month</h3>
      ) : (
        <h3 className={css.title}>Statistics</h3>
      )}
      <div className={css.paginationContainer}>
        <div className={css.paginationElements}>
          <button
            className={`${css.button} ${isLoading ? css.blockedButton : ""}`}
            type="button"
            onClick={() => onPreviousMonth()}
          >
            <svg className={css.paginationIcon}>
              <use href={`${icons}#icon-chevron-left`} />
            </svg>
          </button>

          <p className={css.paginationText}>
            {namedMonth}, {year}
          </p>

          <button
            className={`${css.button} ${isLoading ? css.blockedButton : ""}`}
            type="button"
            onClick={() => onNextMonth()}
          >
            <svg className={css.paginationIcon}>
              <use href={`${icons}#icon-chevron-right`} />
            </svg>
          </button>
        </div>

        <button
          className={css.pieButton}
          type="button"
          onClick={handleIconClick}
        >
          <svg className={css.pieIcon}>
            <use href={`${icons}#icon-pie-for-statistics-active`} />
          </svg>
        </button>
      </div>
    </div>
  );
}
