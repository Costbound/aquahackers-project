import css from "./WaterModal.module.css";
import WaterForm from "../WaterForm/WaterForm.jsx";
import { Toaster } from "react-hot-toast";

const WaterModal = ({ waterAmount, date, type, waterId }) => {
    // type can be 'add' or 'edit'
    // For add required props type, date by default current
  //   For edit required all props
  return (
    <div className={css.divModal}>
      <Toaster />
      <h2 className={css.title}>
        {type === "edit" ? "Edit the entered amount of water" : "Add water"}
      </h2>

      <WaterForm
        waterAmount={waterAmount}
        date={date}
        type={type}
        waterId={waterId}
      />
    </div>
  );
};

export default WaterModal;
