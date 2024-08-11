import Button from "../Button/Button";
import { useState, useId, useContext } from "react";
import * as Yup from "yup";
import css from "./WaterForm.module.css";
import icon from "../../img/icons.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import clsx from "clsx";
import getCurrentTime from "../../helpers/getCurrentTime.js";
import generateWaterString from "../../helpers/generateWaterString.js";
import { ModalContext } from "../Modal/ModalProvider.jsx";
import {useDispatch, useSelector} from "react-redux";
import { addWater, editWater } from "../../redux/water/ops-water.js";
import { selectorIsLoading } from '../../redux/water/selectors-water.js';
import Loader from "../Loader/Loader.jsx";



const WaterForm = ({ date, time = getCurrentTime(), type, waterAmount, waterId }) => {
  const isLoading = useSelector(selectorIsLoading);
  const { closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const waterValidSchema = Yup.object().shape({
    waterAmount: Yup.number()
      .min(50, "The minimum amount is 50 ml")
      .max(2000, "The maximum amount is 2000 ml")
      .required("Amount of water is required"),
    time: Yup.string()
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
    if (value < 2001) {
      setWaterAmountState(value);
      setFieldValue("waterAmount", value);
    }
  };

  const handleSubmit = (values) => {
    const filteredValues = {
      waterAmount: Number(values.waterAmount),
      date: `${date}T${values.time}`
    };
    if (type === "add") {
      dispatch(addWater(filteredValues));
    } else if (type === "edit") {
      if (values.time !== time || filteredValues.waterAmount !== waterAmount) {
        filteredValues.waterId = waterId
        dispatch(editWater(filteredValues))
      }
    } else {
      console.log('Wrong prop "type"')
    }


    closeModal();
  };

  return (
    <Formik
      initialValues={{
        waterAmount: waterAmountState,
        time
      }}
      validationSchema={waterValidSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ setFieldValue, errors }) => (
        <Form className="formWaterForm">
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
            <label className={css.label} htmlFor={timeId}>
              Recording time
            </label>
            <Field
              className={clsx(css.inputSize, errors.time && css.error)}
              type="text"
              name="time"
              id={timeId}
            />
            <ErrorMessage
              className={clsx(css.formValid, css.formName)}
              name="time"
              component="span"
            />
          </div>
          <div className={css.input}>
            <label className={css.labelManual} htmlFor={waterFieldId}>
              Enter the value of the water used
            </label>
            <Field
              className={clsx(css.inputSize, errors.waterAmount && css.error)}
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
            {isLoading ? <Loader type="local" width="20" height="20" color="#fff" /> : "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WaterForm;
