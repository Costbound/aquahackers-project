import css from "./AdvantagesSection.module.css";
import { totalUsers } from "../../redux/userData/ops-userData";
import { selectUserCount } from "../../redux/userData/selectors-userData";
import { useSelector, useDispatch } from "react-redux";

import user1 from "../../img/home-page/customer-1.png";
import user2 from "../../img/home-page/customer-2.png";
import user3 from "../../img/home-page/customer-3.png";

import { useEffect } from "react";

export const AdvantagesSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalUsers()).unwrap();
  }, [dispatch]);

  const userCount = useSelector(selectUserCount);
  return (
    <section className={css.advantagesSection}>
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
        <p className={css.customersText}>

          Our <span className={css.span}>{userCount}</span> happy customers
        </p>
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
    </section>
  );
};

