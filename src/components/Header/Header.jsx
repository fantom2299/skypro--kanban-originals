import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUser from '../PopUser/PopUser';
import {
  HeaderWrapper,
  HeaderBlock,
  Logo,
  Nav,
  NewTaskButton,
  UserName,
} from './Header.styles';

export default function Header({ onNewCard, onExit }) {
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const userName = currentUser?.name || 'Гость';
  const userEmail = currentUser?.email || '';

  const handleExit = () => {
    setUserOpen(false);
    localStorage.removeItem('currentUser');
    onExit?.();
    navigate('/login');
  };

  return (
    <HeaderWrapper>
      <div className="container">
        <HeaderBlock>
          <Logo>
            <img src="../../../public/assets/logo.png" alt="logo" />
          </Logo>

          <Nav>
            <NewTaskButton onClick={onNewCard}>
              Создать новую задачу
            </NewTaskButton>

            <UserName onClick={() => setUserOpen((o) => !o)}>
              {userName}
            </UserName>

            <PopUser
              open={userOpen}
              name={userName}
              email={userEmail}
              onClose={() => setUserOpen(false)}
              onExit={handleExit}
            />
          </Nav>
        </HeaderBlock>
      </div>
    </HeaderWrapper>
  );
}
