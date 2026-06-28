import { CATEGORIES } from '../../data/constants';
import {
  CardWrapper,
  CardGroup,
  CardTheme,
  CardButton,
  CardTitle,
  CardDate,
  
} from './Card.styles';

export default function Card({ task, onOpen, onEdit }) {
  const cat = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[0];

  const handleCardClick = () => {
    onOpen(task);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(task);
    }
  };

  return (
    <CardWrapper onClick={handleCardClick}>
      <CardGroup>
        <CardTheme $variant={cat.colorClass}>{cat.label}</CardTheme>
        {/* <CardId>ID: {task.id}</CardId> */}
        <CardButton onClick={handleEditClick}>
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
  );
}