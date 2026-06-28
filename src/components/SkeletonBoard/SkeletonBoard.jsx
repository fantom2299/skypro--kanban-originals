import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { Board, Column, ColumnTitle } from './SkeletonBoard.styles';

const COLUMNS = [
  { title: 'Без статуса', cards: 5 },
  { title: 'Нужно сделать', cards: 1 },
  { title: 'В работе', cards: 3 },
  { title: 'Тестирование', cards: 1 },
  { title: 'Готово', cards: 1 },
];

export default function SkeletonBoard() {
  return (
    <Board>
      {COLUMNS.map((col) => (
        <Column key={col.title}>
          <ColumnTitle>{col.title}</ColumnTitle>

          {Array.from({ length: col.cards }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </Column>
      ))}
    </Board>
  );
}
