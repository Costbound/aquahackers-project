import css from "./CalendarItem.module.css";

export default function CalendarItem({ data, onClick, activeCheck }) {
  return (
    <button
      className={css.container}
      type="button"
      onClick={() => onClick(data)}
    >
      <div
        className={`
          ${css.itemBall}
          ${data.percentage < 100 ? css.itemBallGray : ""}
          ${activeCheck == data.testId ? css.itemOnClick : ""}
        `}
      >
        <p className={css.ballText}>{data.date}</p>
      </div>
      <p className={css.itemText}>{data.percentage}%</p>
    </button>
  );
}
