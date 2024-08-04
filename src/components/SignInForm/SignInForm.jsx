import { useEffect, useState } from "react";
import css from "./SignInForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/ops-auth.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors-auth.js";
import icon from "../../img/icons.svg";
import { toast, Toaster } from "react-hot-toast";

// Определение схемы валидации с использованием yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInForm = () => {
  const navigate = useNavigate(); // Инициализация функции navigate из react-router-dom
  const dispatch = useDispatch(); // Инициализация функции dispatch из Redux
  const isSignedIn = useSelector(selectIsLoggedIn); // Получение состояния входа из Redux
  const [inputTypePassword, setTypePassword] = useState("password"); // Состояние для типа поля ввода пароля
  const [iconPassword, setIconPassword] = useState("eye-off"); // Состояние для иконки пароля

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Резолвер для схемы валидации
  });

  const onSubmit = async (formData) => {
    try {
      await dispatch(login(formData)).unwrap(); // Вызов операции login с передачей данных формы
      toast.success("Successfully signed in!"); // Уведомление об успешном входе
      reset();
      navigate("/aqua-tracker"); // Перенаправление на страницу трекера
    } catch (error) {
      toast.error(error || "Failed to sign in. Please try again later.");
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/aqua-tracker"); // Перенаправление на страницу трекера, если пользователь уже вошел в систему
    }
  }, [isSignedIn, navigate]);

  const toggleShowPassword = () => {
    setTypePassword((prevType) => (prevType === "password" ? "text" : "password")); // Переключение типа поля ввода пароля(позже)
    setIconPassword((prevIcon) => (prevIcon === "eye-off" ? "eye" : "eye-off")); // Переключение иконки пароля(позже)
  };

  return (
    <div className={css.signUpWrap}>
      {/* Контейнер для формы входа */}
      <Toaster position="top-center" /> {/* Компонент для отображения уведомлений */}
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {/* Форма для входа */}
        <h2 className={css.formTitle}>Sign In</h2>
        <label className={css.label}>Email</label>
        <input
          className={`${css.input} ${errors.email ? css.inputError : ""}`} // Класс для поля ввода с проверкой ошибок
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className={css.errorMessage}>{errors.email.message}</p> // Сообщение об ошибке
        )}
        <div
          style={{
            marginBottom: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <label className={css.label}>Password</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.password ? css.inputError : ""}`} // Класс для поля ввода с проверкой ошибок
              {...register("password")}
              type={inputTypePassword}
              placeholder="Enter your password"
            />
            <button type="button" onClick={toggleShowPassword} className={css.iconButton}>
              {iconPassword === "eye" ? (
                <svg className={css.icon}>
                  <use href={`${icon}#eye`} />
                </svg>
              ) : (
                <svg className={css.icon}>
                  <use href={`${icon}#eye-off`} />
                </svg>
              )}
            </button>
          </div>

          {errors.password && (
            <p className={css.errorMessage}>{errors.password.message}</p> // Сообщение об ошибке
          )}

          <p className={css.text}></p>
        </div>
        <button className={css.signInButton} type="submit">
          Sign In
        </button>
      </form>
      <p className={css.text}>
        Don’t have an account?
        <Link to="/signup">
          <span className={css.spanLink}>Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
