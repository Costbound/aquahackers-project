import css from "./CalendarItem.module.css";

export default function CalendarItem({ data, date, onClick, activeCheck }) {
  return (
    <button
      className={css.container}
      type="button"
      onClick={() => onClick(data)}
    >
      <div
        className={`
          ${css.itemBall}
          ${data.dailyProgress < 100 ? css.itemBallGray : ""}
          ${activeCheck === data.date ? css.itemOnClick : ""}
        `}
      >
        <p className={css.ballText}>{date}</p>
      </div>
      <p className={css.itemText}>{data.dailyProgress}%</p>
    </button>
  );
}
