import { useEffect, useState } from "react";
import css from "./SignInForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/ops-auth.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors-auth.js";
import { toast } from "react-hot-toast";
import screenWidth from "../../helpers/screenWidth.js";
import ShowPwdButton from "../ShowPwdButton/ShowPwdButton.jsx";
import Loader from "../Loader/Loader.jsx"; // Импорт компонента Loader

// Регулярное выражение для проверки email
const emailPattern = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// Определение схемы валидации с использованием yup
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Invalid email! Example: user@example.com")
    .required("Email is required"),
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
  const [isPwdVisible, setIsPwdVisible] = useState(false); // Состояние для иконки пароля
  const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для отслеживания загрузки

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // Резолвер для схемы валидации
  });

  const onSubmit = async (formData) => {
    setIsSubmitting(true); // Устанавливаем состояние загрузки
    try {
      const response = await dispatch(login(formData)).unwrap(); // Вызов операции login с передачей данных формы
      toast.success("Successfully signed in!"); // Уведомление об успешном входе
      reset();
      navigate("/tracker"); // Перенаправление на страницу трекера
    } catch (error) {
      toast.error(error || "Failed to sign in. Please try again later.");
    } finally {
      setIsSubmitting(false); // Сбрасываем состояние загрузки
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/tracker"); // Перенаправление на страницу трекера, если пользователь уже вошел в систему
    }
  }, [isSignedIn, navigate]);

  const toggleShowPassword = () => {
    setTypePassword((prevType) => (prevType === "password" ? "text" : "password")); // Переключение типа поля ввода пароля(позже)
    setIsPwdVisible(!isPwdVisible); // Переключение иконки пароля(позже)
  };

  return (
    <div>
      {/* Контейнер для формы входа */}
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {/* Форма для входа */}
        <h2 className={css.formTitle}>Sign In</h2>
        <label className={css.label}>Email</label>
        <input
          className={`${css.input} ${errors.email ? css.inputError : ""} ${css.emailInput}`} // Класс для поля ввода с проверкой ошибок
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className={css.error + " " + css.errorEmail}>{errors.email.message}</p> // Сообщение об ошибке
        )}
        <div className={css.pwdInputWrapper}>
          <label className={css.label}>Password</label>
          <div className={css.inputWrapper}>
            <input
              className={`${css.input} ${errors.password ? css.inputError : ""}`} // Класс для поля ввода с проверкой ошибок
              {...register("password")}
              type={inputTypePassword}
              placeholder="Enter your password"
            />
            {screenWidth > 767 && (
              <ShowPwdButton onClick={toggleShowPassword} isPwdVisible={isPwdVisible} />
            )}
          </div>

          {errors.password && (
            <p className={css.error + " " + css.errorPassword}>{errors.password.message}</p> // Сообщение об ошибке
          )}

          <p className={css.text}></p>
        </div>
        <button className={css.signInButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader type="local" width="20" height="20" color="#fff" /> : "Sign In"}
        </button>
      </form>
      <p className={css.text}>
        Don’t have an account?{" "}
        <Link to="/signup">
          <span className={css.spanLink}>Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
