import Button from "../Button/Button";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Button from "../../components/Button/Button.jsx";

const validationSchema = Yup.object().shape({
  waterAmount: Yup.number()
    .min(50, "Мінімальна кількість 50ml")
    .max(2000, "Максимальна кількість 2000ml")
    .required("Кількість води обовʼязкова"),
  date: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Невірний формат часу")
    .required("Час обовʼязковий"),
});

const WaterForm = ({
  waterAmount,
  date,
  onWaterAmountChange,
  onDateChange,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      waterAmount,
      date,
    },
  });

  const handleIncrement = () => onWaterAmountChange(waterAmount + 50);
  const handleDecrement = () => onWaterAmountChange(waterAmount - 50);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        <input
          type="number"
          {...register("waterAmount")}
          value={waterAmount}
          onChange={(e) => onWaterAmountChange(Number(e.target.value))}
        />
        <button type="button" onClick={handleIncrement}>
          +
        </button>
        {errors.waterAmount && <p>{errors.waterAmount.message}</p>}
      </div>
      <div>
        <input
          type="time"
          {...register("date")}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
        {errors.date && <p>{errors.date.message}</p>}
      </div>
      <Button
        width="150px"
        height="50px"
        color="#323f47"
        backgroundColor="#9be1a0"
        border="none"
        fontSize="16px"
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </Button>
    </form>
  );
};

export default WaterForm;
