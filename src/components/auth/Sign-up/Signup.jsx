import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../auth/auth.module.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState("");

  const hasErrors = () => {
    // Проверка на пустые поля
    const hasEmptyFields =
      !formData.name.trim() || !formData.email || !formData.password;

    // Проверка на валидационные ошибки
    const hasValidationErrors = Object.keys(errors).length > 0;

    // Проверка на общую ошибку формы
    const hasFormError = !!formError;

    return hasEmptyFields || hasValidationErrors || hasFormError;
  };

  // const validateForm = () => {
  //   const newErrors = {};

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!formData.email) {
  //     newErrors.email = "Введите email";
  //   } else if (!emailRegex.test(formData.email)) {
  //     newErrors.email =
  //       "Введённые данные некорректны. Проверьте email и повторите попытку.";
  //   }

  //   if (!formData.password) {
  //     newErrors.password = "Введите пароль";
  //   } else {
  //     // Раздельные проверки
  //     const hasMinLength = formData.password.length >= 6;
  //     const hasUpperCase = /[A-Z]/.test(formData.password);
  //     const hasNumber = /[0-9]/.test(formData.password);
  //     const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
  //       formData.password,
  //     );

  //     if (!hasMinLength) {
  //       newErrors.password = "Пароль должен содержать минимум 6 символов";
  //     } else if (!hasUpperCase) {
  //       newErrors.password = "Пароль должен содержать заглавную букву";
  //     } else if (!hasNumber) {
  //       newErrors.password = "Пароль должен содержать цифру";
  //     } else if (!hasSpecialChar) {
  //       newErrors.password =
  //         "Пароль должен содержать спецсимвол (!@#$%^&* и т.д.)";
  //     }
  //   }

  //   if (!formData.password) {
  //     newErrors.password = "Введите пароль";
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = "Пароль должен содержать минимум 6 символов";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const validateForm = () => {
    const newErrors = {};

    // Email проверка
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Введите email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    // Простая проверка пароля
    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (formError) setFormError("");
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });

    const hasEmptyFields =
      !formData.name.trim() || !formData.email || !formData.password;
    if (hasEmptyFields) {
      setFormError("Введённые данные некорректны.\nЗаполните все поля формы.");
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "Заполните это поле";
      if (!formData.email) newErrors.email = "Заполните это поле";
      if (!formData.password) newErrors.password = "Заполните это поле";
      setErrors(newErrors);
      return;
    }

    if (!validateForm()) {
      setFormError(
        "Введённые данные некорректны. Проверьте данные и повторите попытку.",
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === formData.email)) {
      setErrors({
        ...errors,
        email: "Пользователь с таким email уже существует",
      });
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      registeredAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  const getInputClass = (fieldName) => {
    const hasError = touched[fieldName] && errors[fieldName];
    return `${styles.input} ${hasError ? styles["input-error"] : ""}`.trim();
  };

    const getButtonClass = () => {
      const isDisabled = hasErrors();
      return `${styles.button} ${isDisabled ? styles["button-disabled"] : ""}`;
    };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.entry}>Регистрация</p>

        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("name")}
        />

        <input
          type="email"
          name="email"
          placeholder="Эл. почта"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("email")}
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("password")}
        />

        {formError && <p className={styles["form-error"]}>{formError}</p>}

        <button
          className={getButtonClass()}
          type="submit"
          // disabled={hasErrors()}
        >
          Зарегистрироваться
        </button>
      </form>

      <div className={styles.login}>
        <p className={styles.text}>
          Уже есть аккаунт?{" "}
          <Link className={styles.link} to="/login">
            Войдите здесь
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;