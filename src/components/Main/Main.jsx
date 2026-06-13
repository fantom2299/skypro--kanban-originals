import { STATUSES } from "../../data/constants";
import Column from "../Column/Column";
import "./Main.css";

export default function Main({ tasks, onOpen }) {
  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {STATUSES.map(status => (
              <Column
                key={status}
                title={status}
                tasks={tasks.filter(t => t.status === status)}
                onOpen={onOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
