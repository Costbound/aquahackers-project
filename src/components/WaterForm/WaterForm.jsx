import Button from "../Button/Button";
// import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./WaterForm.module.css";
import icon from "../../img/icons.svg";

// import { Formik, Form, Field, ErrorMessage } from "formik";

const WaterValidSchema = Yup.object().shape({
  waterAmount: Yup.number()
    .min(50, "Мінімальна кількість 50ml")
    .max(2000, "Максимальна кількість 2000ml")
    .required("Кількість води обовʼязкова"),
  date: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Невірний формат часу")
    .required("Час обовʼязковий"),
});

const WaterForm = ({
  date,
  type,
  waterAmount,
  onWaterAmountChange,
  onSubmit,
  onDateChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WaterValidSchema),
    defaultValues: {
      waterAmount,
      date,
    },
  });

  const handleIncrement = () => onWaterAmountChange(waterAmount + 50);
  const handleDecrement = () => onWaterAmountChange(waterAmount - 50);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className={css.title}>
        {type === "edit" ? "Correct entered data" : "Choose a value"}
      </h4>
      <div className={css.inputAutomaticDiv}>
        <h5 className={css.label}>Amount of water</h5>
        <div className={css.btnAmount}>
          <button
            className={css.btnAmountChange}
            type="button"
            onClick={handleDecrement}
          >
            <svg className={css.svgIcon}>
              <use href={`${icon}#icon-minus-for-modal-add-edit-water`} />
            </svg>
          </button>
          <div className={css.inputAutomatic}>{waterAmount} ml</div>
          <button
            className={css.btnAmountChange}
            type="button"
            onClick={handleIncrement}
          >
            <svg className={css.svgIcon}>
              <use href={`${icon}#icon-plus-for-modal-add-edit-water`} />
            </svg>
          </button>
          {errors.waterAmount && <p>{errors.waterAmount.message}</p>}
        </div>
      </div>
      <div className={css.input}>
        <label className={css.label} htmlFor="time">
          Recording time
        </label>
        <input
          className={css.inputSize}
          id="time"
          type="time"
          {...register("date")}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </div>
      <div className={css.input}>
        <label className={css.labelManual} htmlFor="waterManual">
          Enter the value of the water used
        </label>
        <input
          className={css.inputSize}
          id="waterManual"
          type="number"
          {...register("waterAmount")}
        />
        {errors.waterAmount && <p>{errors.waterAmount.message}</p>}
      </div>
      <Button styleType="green" className={css.myButton}>
        Save
      </Button>
    </form>
  );
};

export default WaterForm;
