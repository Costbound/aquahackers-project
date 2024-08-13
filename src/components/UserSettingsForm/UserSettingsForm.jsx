import css from "./UserSettingsForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { calcRequiredWater } from "../../helpers/calcRequiredWater.js";
import { selectUser } from "../../redux/userData/selectors-userData.js";
import Button from "../Button/Button.jsx";
import { useContext, useId, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateUserData } from "../../redux/userData/ops-userData.js";
import { updateProgress } from "../../redux/water/ops-water.js";
import defaultAvatar from "../../img/avatar.png";
import checkPhotoExtension from "../../helpers/checkPhotoExtension.js";
import Loader from "../Loader/Loader";
import icon from "../../img/icons.svg";
import { ModalContext } from "../Modal/ModalProvider.jsx";
import clsx from "clsx";

const schema = yup.object().shape({
  avatar: yup.mixed(),

  gender: yup
    .string()
    .nullable()
    .oneOf(["woman", "man"], "Please select your gender"),

  name: yup
    .string()
    .min(2, "Name must be greater than or equal to 2 characters long")
    .max(40, "Name must be less than or equal to 40 characters long"),

  weight: yup
    .number()
    .nullable()
    .min(0, "Weight must be greater than or equal to 0")
    .max(250, "Weight must be less than or equal to 250"),

  activityTime: yup
    .number()
    .nullable()
    .min(0)
    .max(12, "Time must be less than or equal to 12"),

  desiredVolume: yup
    .number()
    .nullable()
    .test("is-decimal", "Please enter a valid number", (value) => {
      if (value === undefined || value === null || value === "") return true;
      return !isNaN(parseFloat(value)) && isFinite(value);
    })
    .test(
      "min-value",
      "Value must be greater than or equal to 0.1",
      (value) => {
        if (value === undefined || value === null || value === "") return true;
        return parseFloat(value) >= 0.1;
      }
    )
    .test("max-value", "Value must be less than or equal to 99", (value) => {
      if (value === undefined || value === null || value === "") return true;
      return parseFloat(value) <= 99;
    }),
});

const CustomRadioButton = ({ field, label, onChange }) => {
  return (
    <label className={css.customRadio}>
      <input
        type="radio"
        {...field}
        onChange={onChange}
      />
      <span className={css.checkmark}></span>
      {label}
    </label>
  );
};

export const UserSettingsForm = () => {
  const { closeModal } = useContext(ModalContext);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const avatarId = useId();
  const nameId = useId();
  const emailId = useId();
  const weightId = useId();
  const waterRateId = useId();
  const maleId = useId();
  const femaleId = useId();
  const sportsId = useId();

  const [requiredWater, setRequiredWater] = useState(() =>
    calcRequiredWater(user.gender, user.weight, user.sportTime)
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setRequiredWater(
      calcRequiredWater(user.gender, user.weight, user.sportTime)
    );
  }, [user.gender, user.weight, user.sportTime]);

  const handleUploadPhoto = async (e) => {
    const avatar = e.target.files[0];
    if (checkPhotoExtension(avatar)) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      setIsUploading(true);
      await dispatch(updateUserData(formData));
      setIsUploading(false);
    } else {
      console.log("This photo format is not supported");
    }
  };

  const handleInputChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);

    if (name === "gender" || name === "weight" || name === "activityTime") {
      const newGender = name === "gender" ? value : user.gender;
      const newWeight = name === "weight" ? value : user.weight;
      const newActivityTime = name === "activityTime" ? value : user.sportTime;

      let newRequiredWater;
      if (newGender === "woman") {
        newRequiredWater = newWeight * 0.03 + newActivityTime * 0.4;
      } else if (newGender === "man") {
        newRequiredWater = newWeight * 0.04 + newActivityTime * 0.6;
      } else {
        newRequiredWater = 1.8;
      }
      setRequiredWater(newRequiredWater.toFixed(1));
    }
  };

  const handleSubmit = async (values) => {
    const filteredValues = {
      name: values.name,
      weight: Number(values.weight),
      gender: values.gender,
      sportTime: Number(values.activityTime),
      waterRate: Number(values.desiredVolume) * 1000,
    };
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("weight", Number(values.weight));
      formData.append("gender", values.gender);
      formData.append("sportTime", Number(values.activityTime));
      formData.append("waterRate", Number(values.desiredVolume) * 1000);

      setIsSubmitting(true);
      await dispatch(updateUserData(formData));

      if (filteredValues.waterRate !== user.waterRate) {
        await dispatch(updateProgress());
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
    closeModal();
  };

  return (
    <Formik
      initialValues={{
        name: user.name,
        email: user.email,
        gender: user.gender,
        weight: user.weight || 0,
        activityTime: user.sportTime,
        desiredVolume: user.waterRate / 1000,
        avatar: user.avatar,
      }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ errors, setFieldValue }) => (
        <Form className={css.wrapper}>
          <div className={css.avatarWrapper}>
            {isUploading ? (
              <Loader type="avatar" />
            ) : (
              <img
                className={css.avatar}
                src={user.avatar || defaultAvatar}
                alt="Avatar"
              />
            )}
            <input
              className={css.hiddenFileInput}
              type="file"
              name="avatar"
              id={avatarId}
              placeholder="Upload Photo"
              onChange={handleUploadPhoto}
              disabled={isUploading}
            />
            <label htmlFor={avatarId} className={css.fileLabel}>
              <svg className={css.svgIconUpload}>
                <use href={`${icon}#icon-upload-photo`} />
              </svg>
              Upload Photo
            </label>
          </div>

          <div className={css.settingsWrapper}>
            <div className={css.leftDesktopWrapper}>
              <div className={css.genderWrapper}>
                <p className={css.subtitle}>Your gender identity</p>
                <div className={css.radiobuttonWrapper}>
                  <Field
                    className={css.hiddenRadioInput}
                    type="radio"
                    name="gender"
                    id={femaleId}
                    value="woman"
                    component={CustomRadioButton}
                    onChange={(e) => handleInputChange(e, setFieldValue)}
                  />
                  <label
                    className={`${css.text} ${css.genderLabel}`}
                    htmlFor={femaleId}
                  >
                    Woman
                  </label>

                  <Field
                    className={css.hiddenRadioInput}
                    type="radio"
                    name="gender"
                    id={maleId}
                    value="man"
                    component={CustomRadioButton}
                    onChange={(e) => handleInputChange(e, setFieldValue)}
                  />

                  <label
                    className={`${css.text} ${css.genderLabel}`}
                    htmlFor={maleId}
                  >
                    Man
                  </label>
                </div>
              </div>

              <div className={css.infoWrapper}>
                <div className={css.subInfoWrapper}>
                  <label className={css.subtitle} htmlFor={nameId}>
                    Your name
                  </label>
                  <Field
                    className={clsx(css.input, errors.name && css.error)}
                    name="name"
                    id={nameId}
                  />
                  <ErrorMessage
                    className={clsx(css.formValidName, css.alertPosition)}
                    name="name"
                    component="span"
                  />
                </div>

                <div className={css.subInfoWrapper}>
                  <label className={css.subtitle} htmlFor={emailId}>
                    Email
                  </label>
                  <Field
                    className={css.input}
                    name="email"
                    id={emailId}
                    disabled
                  />
                </div>
              </div>

              <div className={css.normaWrapper}>
                <p className={css.subtitle}>My daily norma</p>

                <div className={css.formulaWrapper}>
                  <div className={css.formulaSubwrapper}>
                    <p className={css.text}>For woman:</p>
                    <span className={`${css.text} ${css.normaFormula}`}>
                      V=(M*0,03) + (T*0,4)
                    </span>
                  </div>

                  <div className={css.formulaSubwrapper}>
                    <p className={css.text}>For man:</p>
                    <span className={`${css.text} ${css.normaFormula}`}>
                      V=(M*0,04) + (T*0,6)
                    </span>
                  </div>
                </div>

                <p className={css.normaTextArea}>
                  <span className={css.normaAsterisk}>*</span> V is the volume
                  of the water norm in liters per day, M is your body weight, T
                  is the time of active sports, or another type of activity
                  commensurate in terms of loads (in the absence of these, you
                  must set 0)
                </p>

                <div className={css.textContainer}>
                  <svg className={css.svgExclamation}>
                    <use href={`${icon}#icon-exclamation-for-settings`} />
                  </svg>
                  <p className={css.text}>Active time in hours</p>
                </div>
              </div>
            </div>

            <div className={css.rightDesktopWrapper}>
              <div className={css.metricsWrapper}>
                <div className={css.metricsSubWrapper}>
                  <label className={css.text} htmlFor={weightId}>
                    Your weight in kilograms:
                  </label>
                  <Field
                    className={clsx(
                      css.input,
                      css.numberInput,
                      errors.weight && css.error
                    )}
                    name="weight"
                    id={weightId}
                    type="number"
                    min="0"
                    onChange={(e) => handleInputChange(e, setFieldValue)}
                  />
                  <ErrorMessage
                    className={clsx(css.formValid, css.alertPosition)}
                    name="weight"
                    component="span"
                  />
                </div>

                <div className={css.metricsSubWrapper}>
                  <label className={css.text} htmlFor={sportsId}>
                    The time of active participation in sports:
                  </label>
                  <Field
                    className={clsx(
                      css.input,
                      css.numberInput,
                      errors.activityTime && css.error
                    )}
                    name="activityTime"
                    id={sportsId}
                    onChange={(e) => handleInputChange(e, setFieldValue)}
                  />
                  <ErrorMessage
                    className={clsx(css.formValid, css.alertPosition)}
                    name="activityTime"
                    component="span"
                  />
                </div>
              </div>

              <div className={css.waterAmountWrapper}>
                <div className={css.amountField}>
                  <p className={css.text}>
                    The required amount of water in liters per day:
                  </p>

                  <span className={css.amount}>
                    <span className={`${css.text} ${css.normaFormula}`}>
                      {!user.gender || !user.weight
                        ? "1.8 L"
                        : requiredWater + " L"}
                    </span>
                  </span>
                </div>

                <div className={css.volumeWrapper}>
                  <label className={css.subtitle} htmlFor={waterRateId}>
                    Write down how much water you will drink:
                  </label>
                  <Field
                    className={clsx(
                      css.input,
                      errors.desiredVolume && css.error
                    )}
                    name="desiredVolume"
                    id={waterRateId}
                    onChange={(e) => handleInputChange(e, setFieldValue)}
                  />
                  <ErrorMessage
                    className={clsx(css.formValid, css.alertPosition)}
                    name="desiredVolume"
                    component="span"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button styleType="green" className={css.submitButton} type="submit">
            {isSubmitting ? (
              <Loader type="button" width="20" height="20" color="#fff" />
            ) : (
              "Save"
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
