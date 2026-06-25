import { useState } from "react";
import Calendar from "../Calendar/Calendar";
import { CATEGORIES } from "../../data/constants";
import {
  Overlay,
  PopContainer,
  TopBlock,
  Title,
  CloseButton,
  Wrap,
  Form,
  FormBlock,
  Label,
  Input,
  TextArea,
  CategoriesBlock,
  CategoriesTitle,
  CategoriesThemes,
  CategoryTheme,
  CreateButton,
} from "./PopNewCard.styles";

const PopNewCard = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("orange");
  const [date, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

 
  const handleCreate = () => {
  if (!title.trim()) return;
  
  // 🔥 Создаём задачу и получаем её
  const newTask = onCreate({
    title: title.trim(),
    desc,
    category,
    date: date || new Date().toLocaleDateString(),
    status: "Без статуса",
  });
  
  // 🔥 Закрываем модалку и передаём созданную задачу
  onClose(newTask);
  };

  return (
    <Overlay onClick={() => onClose(null)}>
      <PopContainer onClick={(e) => e.stopPropagation()}>
        <TopBlock>
          <Title>Создание задачи</Title>
          <CloseButton onClick={() => onClose(null)}>✕</CloseButton>
        </TopBlock>

        <Wrap>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormBlock>
              <Label htmlFor="formTitle">Название задачи</Label>
              <Input
                type="text"
                id="formTitle"
                placeholder="Введите название задачи..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                disabled={isLoading}
              />
            </FormBlock>

            <FormBlock>
              <Label htmlFor="textArea">Описание задачи</Label>
              <TextArea
                id="textArea"
                placeholder="Введите описание задачи..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                disabled={isLoading}
              />
            </FormBlock>
          </Form>

          <Calendar selectedDate={date} onSelect={setDate} />
        </Wrap>

        <CategoriesBlock>
          <CategoriesTitle>Категория</CategoriesTitle>
          <CategoriesThemes>
            {CATEGORIES.map((cat) => (
              <CategoryTheme
                key={cat.id}
                $variant={cat.colorClass}
                $active={category === cat.id}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </CategoryTheme>
            ))}
          </CategoriesThemes>
        </CategoriesBlock>

        <CreateButton onClick={handleCreate} disabled={isLoading}>
          {isLoading ? "Создание..." : "Создать задачу"}
        </CreateButton>
      </PopContainer>
    </Overlay>
  );
};

export default PopNewCard;