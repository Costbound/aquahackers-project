import Button from "../Button/Button";
import { useState, useId } from "react";
import * as Yup from "yup";
import css from "./WaterForm.module.css";
import icon from "../../img/icons.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import clsx from "clsx";
import getCurerntTime from "../../helpers/getCurerntTime.js";
import generateWaterString from "../../helpers/generateWaterString.js";
import getTodayDate from "../../helpers/getTodayDate.js";

const WaterFormFormik = ({ date, type, waterAmount, waterId }) => {
  const waterValidSchema = Yup.object().shape({
    waterAmount: Yup.number()
      .min(50, "The minimum amount is 50 ml")
      .max(2000, "The maximum amount is 2000 ml")
      .required("Amount of water is required"),
    date: Yup.string()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format")
      .required("Time is required"),
  });

  const timeId = useId();
  const waterFieldId = useId();

  const [waterAmountState, setWaterAmountState] = useState(
    type === "edit" ? waterAmount || 50 : 50
  );

  const handleChange = (e, setFieldValue) => {
    const value = Number(e.target.value);

    setWaterAmountState(value);
    setFieldValue("waterAmount", value);
  };

  const handleSubmit = (values) => {
    const filteredValues = {
      waterId,
      waterAmount: Number(values.waterAmount),
      date: `${
        type === "add" ? getTodayDate() : date ? date : getTodayDate()
      }T${values.date}`,
    };
    console.log(filteredValues);
  };

  return (
    <Formik
      initialValues={{
        waterAmount: waterAmountState,
        date: type === "edit" && date ? date.slice(-5) : getCurerntTime(),
      }}
      validationSchema={waterValidSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ setFieldValue }) => (
        <Form>
          <h4 className={css.title}>
            {type === "edit" ? "Correct entered data" : "Choose a value"}
          </h4>
          <div className={css.inputAutomaticDiv}>
            <h5 className={css.label}>Amount of water</h5>
            <div className={css.btnAmount}>
              <button
                className={css.btnAmountChange}
                type="button"
                onClick={() => {
                  if (waterAmountState > 50) {
                    setWaterAmountState(waterAmountState - 50);
                    setFieldValue("waterAmount", waterAmountState - 50);
                  }
                }}
              >
                <svg className={css.svgIcon}>
                  <use href={`${icon}#icon-minus-for-modal-add-edit-water`} />
                </svg>
              </button>
              <div className={css.inputAutomatic}>
                {generateWaterString(waterAmountState)}
              </div>
              <button
                className={css.btnAmountChange}
                type="button"
                onClick={() => {
                  if (waterAmountState < 2000) {
                    setWaterAmountState(waterAmountState + 50);
                    setFieldValue("waterAmount", waterAmountState + 50);
                  }
                }}
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
              name="date"
              id={timeId}
            />
            <ErrorMessage
              className={clsx(css.formValid, css.formName)}
              name="date"
              component="span"
            />
          </div>
          <div className={css.input}>
            <label className={css.labelManual} htmlFor={waterFieldId}>
              Enter the value of the water used
            </label>
            <Field
              className={css.inputSize}
              type="text"
              name="waterAmount"
              id={waterFieldId}
              onChange={(e) => handleChange(e, setFieldValue)}
            />
            <ErrorMessage
              className={clsx(css.formValid, css.formNum)}
              name="waterAmount"
              component="span"
            />
          </div>

          <Button styleType="green" className={css.myButton} type="submit">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WaterFormFormik;
