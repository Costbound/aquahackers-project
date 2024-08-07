import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.wrap}>
        <p className={css.txt}>Uh-oh...</p>
      </div>
      <div className={css.wrap}>
        <p className={css.text}>Not Found Page. Please go to the</p>
        <p>
          <Link className={css.link} to="/">
            home page
          </Link>
        </p>
      </div>
      <p className={css.status}>404</p>
    </div>
  );
};

export default NotFoundPage;