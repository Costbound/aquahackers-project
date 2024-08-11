import css from "./SignUpForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signup } from "../../redux/auth/ops-auth";
import { toast } from "react-hot-toast";
import screenWidth from "../../helpers/screenWidth.js";
import ShowPwdButton from "../ShowPwdButton/ShowPwdButton.jsx";
import Loader from "../Loader/Loader"; // Импортируем ваш компонент Loader

// Определение пользовательского шаблона для email
const emailPattern = /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Invalid email! Example: user@example.com")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [inputTypePassword, setTypePassword] = useState("password");
  const [inputTypeRePassword, setTypeRePassword] = useState("password");
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isRePwdVisible, setIsRePwdVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Состояние для загрузки

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setIsLoading(true); // Включаем лоадер
    const reqData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      await dispatch(signup(reqData)).unwrap();
      toast.success("Successfully registered!");
      reset();
      navigate("/signin");
    } catch (error) {
      toast.error(error || "Failed to sign up");
    } finally {
      setIsLoading(false); // Отключаем лоадер
    }
  };

  const toggleShowPassword = () => {
    setTypePassword((prevType) => (prevType === "password" ? "text" : "password"));
    setIsPwdVisible(!isPwdVisible);
  };

  const toggleShowRePassword = () => {
    setTypeRePassword((prevType) => (prevType === "password" ? "text" : "password"));
    setIsRePwdVisible(!isRePwdVisible);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <h2 className={css.formTitle}>Sign Up</h2>
        <label className={css.label}>Email</label>
        <input
          className={`${css.input} ${errors.email ? css.inputError : ""} ${css.emailInput}`}
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email && <p className={css.error + " " + css.errorEmail}>{errors.email.message}</p>}
        <label className={css.label}>Password</label>
        <div className={css.inputWrapper}>
          <input
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
            {...register("password")}
            type={inputTypePassword}
            placeholder="Enter your password"
          />
          {screenWidth > 767 && (
            <ShowPwdButton onClick={toggleShowPassword} isPwdVisible={isPwdVisible} />
          )}
        </div>
        {errors.password && (
          <p className={css.error + " " + css.errorPassword}>{errors.password.message}</p>
        )}
        <label className={css.label}>Repeat password</label>
        <div className={`${css.inputWrapper} ${css.lastInputWrapper}`}>
          <input
            className={`${css.input} ${errors.repeatPassword ? css.inputError : ""}`}
            {...register("repeatPassword")}
            type={inputTypeRePassword}
            placeholder="Repeat password"
          />
          {screenWidth > 767 && (
            <ShowPwdButton onClick={toggleShowRePassword} isPwdVisible={isRePwdVisible} />
          )}
        </div>
        {errors.repeatPassword && (
          <p className={css.error + " " + css.errorRepeat}>{errors.repeatPassword.message}</p>
        )}
        <button className={css.signUpButton} type="submit" disabled={isLoading}>
          {isLoading ? <Loader type="local" width="30" height="30" color="#ffffff" /> : "Sign Up"}{" "}
          {/* Замена текста кнопки на Loader */}
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
