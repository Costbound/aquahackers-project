import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './UserSettingsForm.module.css';
import { FormValidateError } from '../FormValidateError/FormValidateError';
import { calcRequiredWater } from '../../helpers/calcRequiredWater.js';
import { selectUser } from '../../redux/userData/selectors-userData.js';
import { currentEdit } from '../../redux/userData/ops-userData.js';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { PasswordChangeModal } from '../PasswordChangeModal/PasswordChangeModal';

const schema = yup.object().shape({
  avatar: yup.mixed(),

  gender: yup
    .string()
    .nullable()
    .oneOf(['Woman', 'Man'], 'Please select your gender'),

  name: yup
    .string()
    .min(2, 'Name must be greater than or equal to 2 characters long')
    .max(40, 'Name must be less than or equal to 40 characters long'),

  email: yup.string().email('Please enter a valid email address'),

  weight: yup
    .number()
    .nullable()
    .min(20, 'Weight must be greater than or equal to 20')
    .max(600, 'Weight must be less than or equal to 600')
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),

  activityTime: yup
    .number()
    .nullable()
    .min(0)
    .max(12, 'Time must be less than or equal to 12')
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),

  desiredVolume: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    })
    .test('is-decimal', 'Please enter a valid number', (value) => {
      if (value === undefined || value === null || value === '') return true;
      return !isNaN(parseFloat(value)) && isFinite(value);
    })
    .test(
      'min-value',
      'Value must be greater than or equal to 0.1',
      (value) => {
        if (value === undefined || value === null || value === '') return true;
        return parseFloat(value) >= 0.1;
      }
    )
    .test('max-value', 'Value must be less than or equal to 31.2', (value) => {
      if (value === undefined || value === null || value === '') return true;
      return parseFloat(value) <= 31.2;
    }),
});

export const UserSettingsForm = ({ onClose }) => {
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const openModal = () => setIsPassModalOpen(true);

  const closeModal = () => setIsPassModalOpen(false);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: user.gender,
      name: user.name,
      email: user.email,
      weight: user.weight,
      activityTime: user.activityTime,
      desiredVolume: user.desiredVolume / 1000,
    },
  });

  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    data.desiredVolume = data.desiredVolume * 1000;

    const formData = new FormData();

    for (const key in data) {
      if (key === 'avatar') {
        if (data[key][0] !== undefined) {
          formData.append(key, data[key][0]);
        }
        continue;
      }

      if (data[key] === '' || data[key] === undefined || data[key] === null) {
        continue;
      }
      formData.append(key, data[key]);
    }

    const response = await dispatch(currentEdit(formData));
    response.meta.requestStatus === 'fulfilled' && onClose();
  };

  const { avatar, gender, name, email, weight, activityTime, desiredVolume } =
    watch();

  const isAnyFieldFilled =
    avatar ||
    gender ||
    name ||
    email ||
    weight ||
    activityTime ||
    desiredVolume;

  const requiredWater = calcRequiredWater(gender, weight, activityTime);

  return (
    <>
      <form className={css.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.avatarWrapper}>
          <img className={css.avatar} src={user.avatarURL} alt="Avatar" />

          {!avatar || avatar.length === 0 ? (
            <>
              <input
                {...register('avatar')}
                className={css.hiddenFileInput}
                type="file"
                name="avatar"
                id="avatar"
                placeholder={'Upload a photo'}
              />
              <label htmlFor="avatar" className={css.fileLabel}>
                Upload a photo
              </label>
            </>
          ) : (
            <strong className={css.avatarName}>{avatar[0].name}</strong>
          )}
          {errors.avatar && (
            <FormValidateError message={errors.avatar.message} />
          )}
        </div>

        <div className={css.settingsWrapper}>
          <div className={css.leftDesktopWrapper}>
            <div className={css.genderWrapper}>
              <p className={css.subtitle}>Your gender identity</p>
              <input
                {...register('gender')}
                className={css.hiddenRadioInput}
                type="radio"
                name="gender"
                id="woman"
                value="Woman"
              />
              <label
                className={`${css.text} ${css.genderLabel}`}
                htmlFor="woman"
              >
                Woman
              </label>

              <input
                {...register('gender')}
                className={css.hiddenRadioInput}
                type="radio"
                name="gender"
                id="man"
                value="Man"
              />
              <label className={`${css.text} ${css.genderLabel}`} htmlFor="man">
                Man
              </label>

              {errors.gender && (
                <FormValidateError message={errors.gender.message} />
              )}
            </div>

            <div className={css.infoWrapper}>
              <label className={css.subtitle} htmlFor="name">
                Your name
              </label>
              <input
                {...register('name')}
                className={css.input}
                type="text"
                name="name"
                id="name"
              />
              {errors.name && (
                <FormValidateError message={errors.name.message} />
              )}

              <label className={css.subtitle} htmlFor="email">
                Email
              </label>
              <input
                {...register('email')}
                className={css.input}
                type="text"
                name="email"
                id="email"
              />
              {errors.email && (
                <FormValidateError message={errors.email.message} />
              )}
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
                <span className={css.normaAsterisk}>*</span> V is the volume of
                the water norm in liters per day, M is your body weight, T is
                the time of active sports, or another type of activity
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
              <label className={css.text} htmlFor="weight">
                Your weight in kilograms:
              </label>
              <input
                {...register('weight')}
                className={css.input}
                type="number"
                name="weight"
                id="weight"
              />
              {errors.weight && (
                <FormValidateError message={errors.weight.message} />
              )}

              <label className={css.text} htmlFor="activityTime">
                The time of active participation in sports:
              </label>
              <input
                {...register('activityTime')}
                className={css.input}
                type="number"
                name="activityTime"
                id="activityTime"
              />
              {errors.activityTime && (
                <FormValidateError message={errors.activityTime.message} />
              )}
            </div>

            <div className={css.waterAmountWrapper}>
              <div className={css.amountField}>
                <p className={css.text}>
                  The required amount of water in liters per day:
                </p>

                <span className={css.amount}>
                  {!gender || !weight
                    ? 'Waiting for your metrics'
                    : requiredWater + ' L'}
                </span>
              </div>

              <label className={css.subtitle} htmlFor="desiredVolume">
                Write down how much water you will drink:
              </label>
              <input
                {...register('desiredVolume')}
                className={css.input}
                type="text"
                name="desiredVolume"
                id="desiredVolume"
              />
              {errors.desiredVolume && (
                <FormValidateError message={errors.desiredVolume.message} />
              )}

              <button
                type="button"
                className={css.changePassword}
                onClick={openModal}
              >
                Change password
              </button>
            </div>
          </div>
        </div>

        <button
          className={css.submitButton}
          type="submit"
          disabled={!isAnyFieldFilled}
        >
          Save
        </button>
      </form>

      <Modal isOpen={isPassModalOpen} onClose={closeModal}>
        <PasswordChangeModal closeModal={closeModal} />
      </Modal>
    </>
  );
};


 