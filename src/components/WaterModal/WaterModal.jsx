import css from "./WaterModal.module.css";
import WaterForm from "../WaterForm/WaterForm.jsx";

const WaterModal = ({ waterAmount, date, time, type, waterId }) => {
    // type can be 'add' or 'edit'
    // For add required props type, date by default current
  //   For edit required all props
  return (
    <div className={css.divModal}>
      <h2 className={css.title}>
        {type === "edit" ? "Edit the entered amount of water" : "Add water"}
      </h2>

      <WaterForm
        waterAmount={waterAmount}
        date={date}
        time={time}
        type={type}
        waterId={waterId}
      />
    </div>
  );
};

export default WaterModal;
