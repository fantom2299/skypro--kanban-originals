// src/components/NotFound/NotFound.jsx
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin: 20px 0 10px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Title>Страница не найдена</Title>
        <Message>
          Извините, страница, которую вы ищете, не существует или была
          перемещена.
        </Message>
        <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
      </Content>
    </Container>
  );
};

export default NotFound;
