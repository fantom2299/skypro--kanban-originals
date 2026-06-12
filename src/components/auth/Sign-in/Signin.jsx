import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./Signin.styles"; 

const Signin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError("");
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

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
      onLogin(user);
      navigate("/");
    } else {
      setError("Неверный email или пароль");
    }
  };

  // Определяем, есть ли ошибка для поля
  const getFieldError = (fieldName) => {
    return touched[fieldName] && error && !formData[fieldName];
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Вход</Title>

        <Input
          type="email"
          name="email"
          placeholder="Эл. почта"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          $error={getFieldError("email")}
        />

        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          $error={getFieldError("password")}
        />

        {error && <ErrorText>{error}</ErrorText>}

        <SubmitButton type="submit">Войти</SubmitButton>
      </Form>

      <Footer>
        <FooterText>
          Нужно зарегистрироваться?{" "}
          <StyledLink to="/signup">Регистрируйтесь здесь</StyledLink>
        </FooterText>
      </Footer>
    </Container>
  );
};

export default Signin;