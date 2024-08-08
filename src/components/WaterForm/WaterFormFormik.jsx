import Button from "../Button/Button";
import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./WaterForm.module.css";
import icon from "../../img/icons.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";

const WaterFormFormik = ({ time, type }) => {
  const WaterValidSchema = Yup.object().shape({
    waterAmount: Yup.number()
      .min(50, "Мінімальна кількість 50ml")
      .max(2000, "Максимальна кількість 2000ml")
      .required("Кількість води обовʼязкова"),
    date: Yup.string()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Невірний формат часу")
      .required("Час обовʼязковий"),
  });

  const valueWaterId = useId();
  const timeId = useId();
  const waterId = useId();

  const [waterAmount, setWaterAmount] = useState(50);
  const decreaseWater = () => {
    if (waterAmount > 50) {
      setWaterAmount(waterAmount - 50);
    }
  };
  const increaseWater = () => {
    if (waterAmount < 2500) {
      setWaterAmount(waterAmount + 50);
    }
  };

  const handleChange = (event) => {
    setWaterAmount(parseInt(event.target.value, 10) || 50);
  };

  return (
    <Formik
      initialValues={{
        waterAmount: 50,
        date: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationShema={WaterValidSchema}
    >
      <Form>
        <h4 className={css.title}>
          {type === "edit" ? "Correct entered data" : "Choose a value"}
        </h4>
        <div className={css.inputAutomaticDiv}>
          <label className={css.label} htmlFor="valueWaterId">
            Amount of water
          </label>
          <div className={css.btnAmount}>
            <button
              className={css.btnAmountChange}
              type="button"
              onClick={decreaseWater}
            >
              <svg className={css.svgIcon}>
                <use href={`${icon}#icon-minus-for-modal-add-edit-water`} />
              </svg>
            </button>
            <Field
              className={css.inputAutomatic}
              type="number"
              value={waterAmount}
              onChange={handleChange}
              id={valueWaterId}
              readOnly
            />
            <button
              className={css.btnAmountChange}
              type="button"
              onClick={increaseWater}
            >
              <svg className={css.svgIcon}>
                <use href={`${icon}#icon-plus-for-modal-add-edit-water`} />
              </svg>
            </button>
          </div>
        </div>
        <div className={css.input}>
          <label className={css.label} htmlFor="timeId">
            Recording time
          </label>
          <Field
            className={css.inputSize}
            type="text"
            name="time"
            value={time}
            onChange={"handleChangeTime"}
            id={timeId}
          />
          <ErrorMessage name="time" component="span" />
        </div>
        <div className={css.input}>
          <label className={css.labelManual} htmlFor="waterId">
            Enter the value of the water used
          </label>
          <Field
            className={css.inputSize}
            type="text"
            name="waterAmount"
            value={waterAmount}
            onChange={handleChange}
            id={waterId}
          />
          <ErrorMessage name="waterAmount" component="span" />
        </div>

        <Button styleType="green" className={css.myButton}>
          Save
        </Button>
      </Form>
    </Formik>
  );
};

export default WaterFormFormik;