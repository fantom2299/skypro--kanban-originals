import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
`;

const IdBadge = styled.div`
  display: inline-block;
  background: #f0f4f9;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: #5a6a7e;
  margin-bottom: 15px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Label = styled.span`
  font-weight: 700;
  color: #666;
  width: 100px;
`;

const Value = styled.span`
  color: #333;
`;

const BackButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #5a67d8;
  }
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 10px;

  &:hover {
    background: #c82333;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #e74c3c;
  font-size: 18px;
`;

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (!storedTasks) {
      setLoading(false);
      setError(true);
      return;
    }

    const allTasks = JSON.parse(storedTasks);

    const foundTask = allTasks.find((t) => String(t.id) === String(id));

    if (foundTask) {
      setTask(foundTask);
      setError(false);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    const storedTasks = localStorage.getItem("tasks");
    const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = allTasks.filter((t) => String(t.id) !== String(id));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  if (loading) return <Container>Загрузка...</Container>;

  if (error || !task) {
    return (
      <Container>
        <Card>
          <ErrorMessage>Задача с ID "{id}" не найдена</ErrorMessage>
          <BackButton onClick={() => navigate("/")}>
            Вернуться на главную
          </BackButton>
        </Card>
      </Container>
    );
  }

  const getCategoryLabel = (category) => {
    switch (category) {
      case "orange":
        return "Web Design";
      case "green":
        return "Research";
      case "purple":
        return "Copywriting";
      default:
        return "Web Design";
    }
  };

  return (
    <Container>
      <Card>
        <IdBadge>ID: {task.id}</IdBadge>
        <Title>{task.title}</Title>

        <InfoRow>
          <Label>Статус:</Label>
          <Value>{task.status || "Без статуса"}</Value>
        </InfoRow>

        <InfoRow>
          <Label>Категория:</Label>
          <Value>{getCategoryLabel(task.category)}</Value>
        </InfoRow>

        <InfoRow>
          <Label>Дата:</Label>
          <Value>{task.date}</Value>
        </InfoRow>

        <InfoRow>
          <Label>Описание:</Label>
          <Value>{task.desc || "Нет описания"}</Value>
        </InfoRow>

        <ButtonGroup>
          <BackButton onClick={() => navigate("/")}>← Назад</BackButton>
          <DeleteButton onClick={handleDelete}>🗑 Удалить</DeleteButton>
        </ButtonGroup>
      </Card>
    </Container>
  );
};

export default TaskDetail;
