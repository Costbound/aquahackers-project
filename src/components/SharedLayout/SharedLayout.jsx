import css from './SharedLayout.module.css';
import PropTypes from 'prop-types';
import {Toaster} from "react-hot-toast";


const SharedLayout = ({ children }) => {

  return (
    <div className={css.page}>
      <Toaster />
      {children}
    </div>
  );
};
SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SharedLayout;
