import { CATEGORIES } from '../../data/constants';
import {
  CardWrapper,
  CardGroup,
  CardTheme,
  CardButton,
  CardTitle,
  CardDate,
} from './Card.styles';

export default function Card({ task, onOpen }) {
  const cat = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[0];

  return (
    <CardWrapper onClick={() => onOpen(task)}>
      <CardGroup>
        <CardTheme $variant={cat.colorClass}>{cat.label}</CardTheme>

        <CardButton>
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
