import css from "./AdvantagesSection.module.css";
import user1 from "../../img/home-page/customer-1.jpg";
import user2 from "../../img/home-page/customer-2.jpg";
import user3 from "../../img/home-page/customer-3.jpg";

export const AdvantagesSection = () => {
  return (
    <div className={css.advantagesSection}>
      <div className={css.customersBox}>
        <ul className={css.customersList}>
          <li className={css.customersItem}>
            <img className={css.customersImg} src={user1} alt="user1" />
          </li>
          <li className={css.customersItem}>
            <img className={css.customersImg} src={user2} alt="user2" />
          </li>
          <li className={css.customersItem}>
            <img className={css.customersImg} src={user3} alt="user3" />
          </li>
        </ul>
      </div>
      <div className={css.group}>
        <ul className={css.advantagesGroup}>
          <li className={css.textAdvantage}>
            <div className={css.circle}></div>
            <p className={css.text}>Habit drive</p>
          </li>
          <li className={css.textAdvantage}>
            <p className={css.textBlack}>View statistics</p>
          </li>
          <li className={css.textAdvantage}>
            <p className={css.textBlack}>Personal rate setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
