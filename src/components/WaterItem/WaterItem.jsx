import PropTypes from "prop-types";
import css from "./WaterItem.module.css";
import icon from "../../img/icons.svg";
import { useContext } from "react";
import { ModalContext } from "../Modal/ModalProvider.jsx";
import WaterModal from "../WaterModal/WaterModal.jsx";
import DeleteWaterModal from "../Modals/DeleteWaterModal/DeleteWaterModal.jsx";
import generateWaterString from "../../helpers/generateWaterString.js";

const WaterItem = ({ id, amount, dateTime }) => {
  const { openModal } = useContext(ModalContext);

  const handleEditModalOpen = () => {
    const [date, time] = dateTime.split("T");
    openModal(
      <WaterModal
        waterAmount={amount}
        date={date}
        time={time}
        type="edit"
        waterId={id}
      />
    );
  };

  const handleDeleteModalOpen = () => {
    openModal(<DeleteWaterModal waterId={id} />);
  };

  const dateObject = new Date(dateTime);
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return (
    <div className={css.waterItemContainer}>
      <svg className={css.svgIconWater}>
        <use href={`${icon}#icon-glass-of-water`} />
      </svg>
      <div className={css.waterInfo}>
        <span className={css.amount}>{generateWaterString (amount)}</span>
        <span className={css.time}>{time}</span>
      </div>
      <div className={css.actionButtons}>
        <button
          className={css.editButton}
          onClick={handleEditModalOpen}
        >
          <svg className={css.svgIconPencil}>
            <use href={`${icon}#icon-pencil`} />
          </svg>
        </button>
        <button
          className={css.deleteButton}
          onClick={handleDeleteModalOpen}
        >
          <svg className={css.svgIconBin}>
            <use href={`${icon}#icon-bin`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

WaterItem.propTypes = {
  id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  dateTime: PropTypes.string.isRequired,
};

export default WaterItem;
