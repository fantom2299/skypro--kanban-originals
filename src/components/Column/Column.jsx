import Card from '../Card/Card';
import { ColumnWrapper, ColumnTitle, Cards } from './Column.styles';

export default function Column({ title, tasks, onOpen }) {
  return (
    <ColumnWrapper>
      <ColumnTitle>{title}</ColumnTitle>

      <Cards>
        {tasks.map((task) => (
          <Card key={task.id} task={task} onOpen={onOpen} />
        ))}
      </Cards>
    </ColumnWrapper>
  );
}
