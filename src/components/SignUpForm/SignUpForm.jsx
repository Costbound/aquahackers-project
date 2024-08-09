import css from "./SignUpForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signup } from "../../redux/auth/ops-auth";
import { toast, Toaster } from "react-hot-toast";
import screenWidth from "../../helpers/screenWidth.js";
import ShowPwdButton from "../ShowPwdButton/ShowPwdButton.jsx";

// Определение схемы валидации с использованием yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});

const SignUpForm = () => {
  const dispatch = useDispatch(); // Инициализация функции dispatch из Redux
  const [inputTypePassword, setTypePassword] = useState("password"); // Состояние для типа поля ввода пароля
  const [inputTypeRePassword, setTypeRePassword] = useState("password"); // Состояние для типа поля ввода повторного пароля
  const [isPwdVisible, setIsPwdVisible] = useState(false); // Состояние для иконки пароля(в процессе)
  const [isRePwdVisible, setIsRePwdVisible] = useState(false) // Состояние для иконки повторного пароля(в процессе)

  const navigate = useNavigate(); // Инициализация функции navigate из react-router-dom
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Резолвер для схемы валидации
  });

  const onSubmit = async (formData) => {
    const reqData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      await dispatch(signup(reqData)).unwrap(); // Вызов операции signup с передачей данных формы
      toast.success("Successfully registered!"); // Уведомление об успешной регистрации
      reset();
      navigate("/signin"); // Перенаправление на страницу входа
    } catch (error) {
      toast.error(error || "Failed to sign up"); // Уведомление об ошибке регистрации
    }
  };

  const toggleShowPassword = () => {
    setTypePassword((prevType) => (prevType === "password" ? "text" : "password")); // Переключение типа поля ввода пароля
    setIsPwdVisible(!isPwdVisible) // Переключение иконки пароля
  };

  const toggleShowRePassword = () => {
    setTypeRePassword((prevType) => (prevType === "password" ? "text" : "password")); // Переключение типа поля ввода повторного пароля
    setIsRePwdVisible(!isRePwdVisible); // Переключение иконки повторного пароля
  };

  return (
    <div>
      {/* Контейнер для формы регистрации */}
      <Toaster position="top-center" /> {/* Компонент для отображения уведомлений */}
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {/* Форма для регистрации */}
        <h2 className={css.formTitle}>Sign Up</h2>
        <label className={css.label}>Email</label>
        <input
          className={`${css.input} ${errors.email ? css.inputError : ""} ${css.emailInput}`} // Класс для поля ввода с проверкой ошибок
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className={css.error + ' ' + css.errorEmail}>{errors.email.message}</p> // Сообщение об ошибке
        )}
        <label className={css.label}>Password</label>
        <div className={css.inputWrapper}>
          <input
            className={`${css.input} ${errors.password ? css.inputError : ""}`} // Класс для поля ввода с проверкой ошибок
            {...register("password")}
            type={inputTypePassword}
            placeholder="Enter your password"
          />
          {screenWidth > 767 && <ShowPwdButton onClick={toggleShowPassword} isPwdVisible={isPwdVisible}/>}
        </div>
        {errors.password && (
          <p className={css.error + ' ' + css.errorPassword}>{errors.password.message}</p> // Сообщение об ошибке
        )}
        <label className={css.label}>Repeat password</label>
        <div className={`${css.inputWrapper} ${css.lastInputWrapper}`}>
          <input
            className={`${css.input} ${errors.repeatPassword ? css.inputError : ""}`} // Класс для поля ввода с проверкой ошибок
            {...register("repeatPassword")}
            type={inputTypeRePassword}
            placeholder="Repeat password"
          />
          {screenWidth > 767 && <ShowPwdButton onClick={toggleShowRePassword} isPwdVisible={isRePwdVisible}/>}
        </div>
        {errors.repeatPassword && (
            <p className={css.error + ' ' + css.errorRepeat}>{errors.repeatPassword.message}</p> // Сообщение об ошибке
        )}
        <button className={css.signUpButton} type="submit">
          Sign Up
        </button>
      </form>
      <p className={css.text}>
        Already have an account?{" "}
        <Link to="/signin">
          <span className={css.spanLink}>Sign In</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
