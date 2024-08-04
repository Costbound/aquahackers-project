import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setWaterAmount,
  setDate,
  resetWater,
} from "../../redux/water/slice-waterForm";
import { saveWaterData } from "../../redux/water/ops-water";
import WaterForm from "../WaterForm/WaterForm";
import Modal from "../Modal/Modal";
import {
  selectWaterAmount,
  selectDate,
  selectWaterStatus,
  selectWaterError,
} from "./selectors";
import toast, { Toaster } from "react-hot-toast";

const WaterModal = ({
  isOpen,
  onClose,
  type,
  waterId,
  initialWaterAmount,
  initialDate,
}) => {
  const dispatch = useDispatch();
  const waterAmount = useSelector(selectWaterAmount);
  const date = useSelector(selectDate);
  const status = useSelector(selectWaterStatus);
  const error = useSelector(selectWaterError);

  useEffect(() => {
    if (type === "edit" && waterId) {
      // Оновлюємо дані з props
      dispatch(setWaterAmount(initialWaterAmount));
      dispatch(setDate(initialDate));
    } else {
      dispatch(resetWater());
    }
  }, [type, waterId, dispatch, initialWaterAmount, initialDate]);

  const handleSubmit = async (data) => {
    try {
      await dispatch(saveWaterData({ type, waterId, data })).unwrap();
      onClose();
    } catch (error) {
      toast.error("Error saving water data");
    }
  };

  return (
    <>
      <Toaster />
      <Modal isOpen={isOpen} onClose={onClose}>
        <WaterForm
          waterAmount={waterAmount}
          date={date}
          onWaterAmountChange={(amount) => dispatch(setWaterAmount(amount))}
          onDateChange={(newDate) => dispatch(setDate(newDate))}
          onSubmit={handleSubmit}
        />
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </Modal>
    </>
  );
};

export default WaterModal;
