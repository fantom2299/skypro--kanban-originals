import Card from "../Card/Card";
import "./Column.css";

export default function Column({ title, tasks, onOpen }) {
  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>
      <div className="cards">
        {tasks.map(task => (
          <Card key={task.id} task={task} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}
