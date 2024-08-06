import React, { useEffect } from "react";
import css from "./WaterModal.module.css";
// import { useDispatch, useSelector } from "react-redux";
// // import {
//   setWaterAmount,
//   setDate,
//   resetWater,
// } from "../../redux/water/slice-waterForm";
// import { saveWaterData } from "../../redux/water/ops-water";
import WaterForm from "../WaterForm/WaterForm";
// import { selectWaterStatus, selectWaterError } from "./selectors";
import toast, { Toaster } from "react-hot-toast";

const WaterModal = ({ waterAmount, date, type, waterId, onClose }) => {
  // const dispatch = useDispatch();
  // // const waterAmount = useSelector(selectWaterAmount);
  // // const date = useSelector(selectDate);
  // const status = useSelector(selectWaterStatus);
  // const error = useSelector(selectWaterError);

  // useEffect(() => {
  //   if (type === "edit" && waterId) {
  //     // Оновлюємо дані з props

  //     const formattedDate = date.slice(-5);
  //     dispatch(setWaterAmount(waterAmount));
  //     dispatch(setDate(formattedDate));
  //     //   dispatch(setWaterAmount(initialWaterAmount));
  //     //   dispatch(setDate(initialDate));
  //   } else {
  //     dispatch(resetWater());
  //   }
  // }, [type, waterId, dispatch, initialWaterAmount, initialDate]);

  // const handleSubmit = async (data) => {
  //   try {
  //     await dispatch(saveWaterData({ type, waterId, data })).unwrap();
  //     onClose();
  //   } catch (error) {
  //     toast.error("Error saving water data");
  //   }
  // };
  console.log(type);

  const handleAddSubmit = async (data) => {
    "addWaterData";
  };
  const handleEditSubmit = async (data) => {
    "updateWaterData";
  };

  return (
    <div className={css.divModal}>
      <Toaster />
      <h2 className={css.title}>
        {type === "edit" ? "Edit the entered amount of water" : "Add water"}
      </h2>

      <WaterForm
        waterAmount={waterAmount}
        date={date}
        onWaterAmountChange={(amount) => dispatch(setWaterAmount(amount))}
        onDateChange={(newDate) => dispatch(setDate(newDate))}
        onSubmit={type === "edit" ? handleEditSubmit : handleAddSubmit}
        type={type}
      />
      {status === "loading" && <p>Loading...</p>}
      {/* {error && <p>Error: {error}</p>} */}
    </div>
  );
};

export default WaterModal;
