import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrap}>
      <p className={css.txt}>Uh-oh...</p>
      <p className={css.text}>Not Found Page. Please go to the</p>
      <p className={css.link}>
        <Link to="/">home page</Link>
      </p>
      <p className={css.status}>404</p>
    </div>
  );
};

export default NotFoundPage;
