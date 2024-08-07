import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { IconEyeClose } from '../../img/icons.svg';
import { IconEye } from '../../img/icons.svg';

import css from './ResetPasswordForm.module.css';
import { checkResetToken, resetPassword } from '../../redux/userData/ops-userData.js';

const schema = yup.object().shape({
  newPass: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be at least 8 characters long, contain at least one uppercase letter, and at least one digit'
    )
    .required('Please, enter new password')
    .min(8, 'Password is too short - should be 8 chars minimum.'),

  repeatPass: yup
    .string()
    .oneOf([yup.ref('newPass')], 'Passwords must match')
    .required('Please, repeat new password'),
});

export const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [isTokenValid, setIsTokenValid] = useState(null);

  const [showNewPass, setShowNewPass] = useState(false);
  const [showNewPassRepeat, setShowNewPassRepeat] = useState(false);

  const toggleNewPassVisibility = () => {
    setShowNewPass(!showNewPass);
  };

  const toggleCNewPassRepeatVisibility = () => {
    setShowNewPassRepeat(!showNewPassRepeat);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { newPass } = data;

    const response = await dispatch(
      resetPassword({
        newPass,
        resetToken,
      })
    );

    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/signin');
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await dispatch(checkResetToken(resetToken));

        if (response.meta.requestStatus === 'fulfilled') {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        return;
      }
    };

    checkToken();
  }, [dispatch, resetToken]);

  useEffect(() => {
    if (isTokenValid === false) {
      navigate('/not-found-page');
    }
  }, [navigate, isTokenValid]);

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Change the password </h2>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.label} htmlFor="newPass">
          Enter new password:
        </label>

        {errors.newPass && (
          <span className={css.error}>{errors.newPass.message} </span>
        )}

        <div className={css.inputWrapper}>
          <input
            {...register('newPass')}
            className={css.input}
            type={showNewPass ? 'text' : 'password'}
            name="newPass"
            id="newPass"
          />

          <div className={css.icon} onClick={toggleNewPassVisibility}>
            {showNewPass ? <IconEye /> : <IconEyeClose />}
          </div>
        </div>

        <label className={css.label} htmlFor="repeatPass">
          Repeat new password:
        </label>

        {errors.repeatPass && (
          <span className={css.error}>{errors.repeatPass.message} </span>
        )}

        <div className={css.inputWrapper}>
          <input
            {...register('repeatPass')}
            className={css.input}
            type={showNewPassRepeat ? 'text' : 'password'}
            name="repeatPass"
            id="repeatPass"
          />

          <div className={css.icon} onClick={toggleCNewPassRepeatVisibility}>
            {showNewPassRepeat ? <IconEye /> : <IconEyeClose />}
          </div>
        </div>

        <button className={css.submitButton} type="submit">
          Change
        </button>
      </form>
    </div>
  );
};