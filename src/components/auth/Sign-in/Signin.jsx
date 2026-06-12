import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../auth/auth.module.css";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!formData.email || !formData.password) {
      setError("Заполните все поля");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password,
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Неверный email или пароль");
    }
  };

  const getInputClass = (fieldName) => {
    const hasError = touched[fieldName] && error && !formData[fieldName];
    return `${styles.input} ${hasError ? styles["input-error"] : ""}`.trim();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.entry}>Вход</p>

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

        {error && <div className={styles["form-error"]}>{error}</div>}

        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>

      <div className={styles.login}>
        <p className={styles.text}>
          Нужно зарегистрироваться?{" "}
          <Link className={styles.link} to="/signup">Регистрируйтесь здесь</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;