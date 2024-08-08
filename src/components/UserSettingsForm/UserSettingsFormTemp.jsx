import css from "./UserSettingsForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { calcRequiredWater } from "../../helpers/calcRequiredWater.js";
import { selectUser } from "../../redux/userData/selectors-userData.js";
import Button from "../Button/Button.jsx";
// import { Modal } from '../Modal/Modal.jsx';
// import { PasswordChangeModal } from '../PasswordChangeModal/PasswordChangeModal.jsx';
import { useId } from "react";
import { Formik, Form, Field } from "formik";
import { updateUserData } from "../../redux/userData/ops-userData.js";

const schema = yup.object().shape({
  avatar: yup.mixed(),

  gender: yup
    .string()
    .nullable()
    .oneOf(["Woman", "Man"], "Please select your gender"),

  name: yup
    .string()
    .min(2, "Name must be greater than or equal to 2 characters long")
    .max(40, "Name must be less than or equal to 40 characters long"),

  email: yup.string().email("Please enter a valid email address"),

  weight: yup
    .number()
    .nullable()
    .min(20, "Weight must be greater than or equal to 20")
    .max(600, "Weight must be less than or equal to 600")
    .transform((value, originalValue) => {
      if (originalValue === "") return null;
      return value;
    }),

  activityTime: yup
    .number()
    .nullable()
    .min(0)
    .max(12, "Time must be less than or equal to 12")
    .transform((value, originalValue) => {
      if (originalValue === "") return null;
      return value;
    }),

  desiredVolume: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      if (originalValue === "") return null;
      return value;
    })
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
    .test("max-value", "Value must be less than or equal to 31.2", (value) => {
      if (value === undefined || value === null || value === "") return true;
      return parseFloat(value) <= 31.2;
    }),
});

export const UserSettingsForm = ({ onClose }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const nameId = useId();
  const emailId = useId();
  const weightId = useId();
  const waterRateId = useId();
  const maleId = useId();
  const femaleId = useId();
  const sportsId = useId();
  const requiredWater = calcRequiredWater(
    user.gender,
    user.weight,
    user.activityTime
  );

  const handleSubmit = async (values) => {
    const filteredValues = {
      name: values.name,
      weight: Number(values.weight),
      gender: values.gender,
      timeOfSportActivities: Number(values.activityTime),
      waterToDrink: Number(values.desiredVolume) * 1000,
    };
    await dispatch(updateUserData(filteredValues));
    onClose();
  };

  return (
    <Formik
      initialValues={{
        name: user.name,
        email: user.email,
        gender: user.gender,
        weight: user.weight,
        activityTime: user.sportTime,
        desiredVolume: user.waterRate / 1000,
        // avatar: null,
      }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ setFieldValue, values, errors }) => (
        <Form className={css.wrapper}>
          <div className={css.avatarWrapper}>
            <img className={css.avatar} src={user.avatarURL} alt="Avatar" />

            {!values.avatar ? (
              <>
                <input
                  className={css.hiddenFileInput}
                  type="file"
                  name="avatar"
                  id="avatar"
                  placeholder="Загрузить фото"
                  onChange={(event) => {
                    setFieldValue("avatar", event.currentTarget.files[0]);
                  }}
                />
                <label htmlFor="avatar" className={css.fileLabel}>
                  Загрузить фото
                </label>
              </>
            ) : (
              <strong className={css.avatarName}>{values.avatar.name}</strong>
            )}
            {errors.avatar && <div className={css.error}>{errors.avatar}</div>}
          </div>

          <div className={css.settingsWrapper}>
            <div className={css.leftDesktopWrapper}>
              <div className={css.genderWrapper}>
                <p className={css.subtitle}>Your gender identity</p>
                <Field
                  className={css.hiddenRadioInput}
                  type="radio"
                  name="gender"
                  id={femaleId}
                  value="woman"
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
                />
                <label
                  className={`${css.text} ${css.genderLabel}`}
                  htmlFor={maleId}
                >
                  Man
                </label>
              </div>

              <div className={css.infoWrapper}>
                <label className={css.subtitle} htmlFor={nameId}>
                  Your name
                </label>
                <Field className={css.input} name="name" id={nameId} />

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

                <span className={`${css.text} ${css.footnote}`}>
                  Active time in hours
                </span>
              </div>
            </div>

            <div className={css.rightDesktopWrapper}>
              <div className={css.metricsWrapper}>
                <label className={css.text} htmlFor={weightId}>
                  Your weight in kilograms:
                </label>
                <Field className={css.input} name="weight" id={weightId} />

                <label className={css.text} htmlFor={sportsId}>
                  The time of active participation in sports:
                </label>
                <Field
                  className={css.input}
                  name="activityTime"
                  id={sportsId}
                />
              </div>

              <div className={css.waterAmountWrapper}>
                <div className={css.amountField}>
                  <p className={css.text}>
                    The required amount of water in liters per day:
                  </p>

                  <span className={css.amount}>
                    {!user.gender || !user.weight
                      ? "Waiting for your metrics"
                      : requiredWater + " L"}
                  </span>
                </div>

                <label className={css.subtitle} htmlFor={waterRateId}>
                  Write down how much water you will drink:
                </label>
                <Field
                  className={css.input}
                  name="desiredVolume"
                  id={waterRateId}
                />
              </div>
            </div>
          </div>

          <Button styleType="green" className={css.submitButton} type="submit">
            Save
          </Button>
        </Form>

        // {/*<Modal isOpen={isPassModalOpen} onClose={closeModal}>*/}
        // {/*<PasswordChangeModal closeModal={closeModal} />*/}
        // {/*</Modal>*/}
      )}
      ;
    </Formik>
  );
};
