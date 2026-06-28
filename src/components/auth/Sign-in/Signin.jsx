import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
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

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      login: true,
      password: true,
    });

    if (!formData.login || !formData.password) {
      setError("Заполните все поля");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await login({
      login: formData.login,
      password: formData.password,
    });

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Неверный логин или пароль");
    }

    setIsLoading(false);
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && error && !formData[fieldName];
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Вход</Title>

        <Input
          type="text"
          name="login"
          placeholder="Логин"
          value={formData.login}
          onChange={handleChange}
          onBlur={handleBlur}
          $error={getFieldError("login")}
          disabled={isLoading}
        />

        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          $error={getFieldError("password")}
          disabled={isLoading}
        />

        {error && <ErrorText>{error}</ErrorText>}

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Вход..." : "Войти"}
        </SubmitButton>
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