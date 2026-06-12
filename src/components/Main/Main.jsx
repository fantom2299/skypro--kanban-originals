import { STATUSES } from '../../data/constants';
import Column from '../Column/Column';
import { MainWrapper, Content } from './Main.styles';

export default function Main({ tasks, onOpen }) {
  return (
    <MainWrapper>
      <div className="container">
        <div className="main__block">
          <Content>
            {STATUSES.map((status) => (
              <Column
                key={status}
                title={status}
                tasks={tasks.filter((t) => t.status === status)}
                onOpen={onOpen}
              />
            ))}
          </Content>
        </div>
      </div>
    </MainWrapper>
  );
}
