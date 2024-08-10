//WaterItem.jsx
import PropTypes from "prop-types";
import css from "./WaterItem.module.css";
import icon from "../../img/icons.svg";
import Modal from "../Modal/Modal";
import DeleteWaterModal from "../Modals/DeleteWaterModal/DeleteWaterModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChosenWaterCardId,
  selectIsDeleteWaterModalOpen,
  selectIsLogoutModalOpen,
} from "../../redux/water/selectors-water";
import {
  changeDeleteWaterModalOpen,
  changeLogoutModalOpen,
} from "../../redux/water/slice-water";
import LogOutModal from "../Modals/LogOutModal/LogOutModal";
import { Toaster } from "react-hot-toast";

const WaterItem = ({ id, handleOpenModal, amount, date, onEdit }) => {
  // const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const isLogoutModalOpen = useSelector(selectIsLogoutModalOpen);

  const handleCloseLogOutModal = () => {
    dispatch(changeLogoutModalOpen(false));
  };

  const isDeleteWaterModalOpen = useSelector(selectIsDeleteWaterModalOpen);

  const dateObject = new Date(date);
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  const handleCloseModal = () => {
    dispatch(changeDeleteWaterModalOpen(false));
  };

  const handleEdit = () => {
    onEdit();
  };

  return (
    <>
      <div className={css.waterItemContainer}>
        <svg className={css.svgIconWater}>
          <use href={`${icon}#icon-glass-of-water`} />
        </svg>
        <div className={css.waterInfo}>
          <span className={css.amount}>{amount} ml</span>
          <span className={css.time}>{time}</span>
        </div>
        <div className={css.actionButtons}>
          <button onClick={handleEdit} className={css.editButton}>
            <svg className={css.svgIconPencil}>
              <use href={`${icon}#icon-pencil`} />
            </svg>
          </button>
          <button
            onClick={() => handleOpenModal(id)}
            // onClick={handleDelete}
            className={css.deleteButton}
          >
            <svg className={css.svgIconBin}>
              <use href={`${icon}#icon-bin`} />
            </svg>
          </button>
        </div>
      </div>
      <Modal isOpen={isDeleteWaterModalOpen} onClose={handleCloseModal}>
        {isDeleteWaterModalOpen && (
          <DeleteWaterModal
            waterId={id}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
      <Toaster position="center" />
      <Modal isOpen={isLogoutModalOpen} onClose={handleCloseLogOutModal}>
        {isLogoutModalOpen && <LogOutModal onClose={handleCloseLogOutModal} />}
      </Modal>
    </>
  );
};

WaterItem.propTypes = {
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default WaterItem;
