import css from './Page.module.css';
import PropTypes from 'prop-types';
import {Toaster} from "react-hot-toast";


const Page = ({ children }) => {

  return (
    <div className={css.page}>
      <Toaster />
      {children}
    </div>
  );
};
Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
