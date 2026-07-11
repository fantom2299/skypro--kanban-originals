import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  Form, 
  Title,
  Input,
  SubmitButton,
  ErrorText,
  Footer,
  FooterText,
  StyledLink,
} from "./Signup.styles";

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
    const hasEmptyFields =
      !formData.name.trim() || !formData.email || !formData.password;
    const hasValidationErrors = Object.keys(errors).length > 0;
    const hasFormError = !!formError;
    return hasEmptyFields || hasValidationErrors || hasFormError;
  };

  const validateForm = () => {
    const newErrors = {};

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    } else if (formData.name.length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Введите email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Введённые данные некорректны. Проверьте email и повторите попытку.";
    }

    // Валидация пароля
    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Пароль должен содержать минимум 6 символов, одну заглавную букву и одну цифру";
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
        "Введённые данные некорректны. Проверьте данные и повторите попытку."
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

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  const isDisabled = hasErrors();

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Регистрация</Title>

        <Input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          $error={getFieldError("name")}
        />
        {getFieldError("name") && <ErrorText>{errors.name}</ErrorText>}

        <Input
          type="email"
          name="email"
          placeholder="Эл. почта"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          $error={getFieldError("email")}
        />
        {getFieldError("email") && <ErrorText>{errors.email}</ErrorText>}

        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          $error={getFieldError("password")}
        />
        {getFieldError("password") && <ErrorText>{errors.password}</ErrorText>}

        {formError && <ErrorText>{formError}</ErrorText>}

        <SubmitButton type="submit" $disabled={isDisabled}>
          Зарегистрироваться
        </SubmitButton>
      </Form>

      <Footer>
        <FooterText>
          Уже есть аккаунт? <StyledLink to="/login">Войдите здесь</StyledLink>
        </FooterText>
      </Footer>
    </Container>
  );
};

export default Signup;