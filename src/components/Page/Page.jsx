import css from './Page.module.css';
import PropTypes from 'prop-types';
import ModalGlobal from "../Temp/ModalGlobal/ModalGlobal.jsx";



const Page = ({ children }) => {

  return (
    <div className={css.page}>
      {children}
      <ModalGlobal /> {/* TEMP */}
    </div>
  );
};
Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
