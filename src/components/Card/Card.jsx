import { CATEGORIES } from '../../data/constants';
import {
  CardWrapper,
  CardGroup,
  CardTheme,
  CardButton,
  CardTitle,
  CardDate,
  
  CardLink,
} from './Card.styles';

export default function Card({ task, onOpen }) {
  const cat = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[0];

  // Обработчик клика на три точки (открывает модалку)
  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen(task);
  };

  return (
    <CardLink to={`/task/${task.id}`}>  {/* ← ссылка на детальную страницу */}
      <CardWrapper>
        <CardGroup>
          <CardTheme $variant={cat.colorClass}>{cat.label}</CardTheme>
          {/* <CardId>ID: {task.id}</CardId> */}
          <CardButton onClick={handleMenuClick}>
            <div />
            <div />
            <div />
          </CardButton>
        </CardGroup>

        <div>
          <CardTitle>{task.title}</CardTitle>
          <CardDate>
            <p>{task.date}</p>
          </CardDate>
        </div>
      </CardWrapper>
    </CardLink>
  );
}