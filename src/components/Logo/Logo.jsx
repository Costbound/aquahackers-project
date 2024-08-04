import { NavLink } from 'react-router-dom';
import css from './Logo.module.css';
const Logo = () => {
  return (
    <NavLink to="/" className={css.logo}>
      AquaTrack
    </NavLink>
  );
};

export default Logo;
