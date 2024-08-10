import css from './AddWaterButton.module.css';
import icon from "../../img/icons.svg";
import { useContext } from 'react';
import { ModalContext } from "../Modal/ModalProvider.jsx";
import WaterModal from "../WaterModal/WaterModal.jsx";
import {useSelector} from "react-redux";
import {selectSelectedDate} from "../../redux/water/selectors-water.js";

const AddWaterButton = () => {
  const { openModal } = useContext(ModalContext);
  const selectedDate = useSelector(selectSelectedDate);

  const handleModalOpen = () => {
    openModal(<WaterModal type='add' date={selectedDate} />);
  };

  return (
    <div className={css.addWaterContainer}>
      <button className={css.addWaterButton} onClick={handleModalOpen}>
        <svg className={css.svgIconPlus}>
          <use href={`${icon}#icon-plus-1`} />
        </svg>
      </button>
      <span className={css.addWaterText}>Add water</span>
    </div>
  );
};

export default AddWaterButton;
