import { useState } from 'react';
import PopUser from '../PopUser/PopUser';
import {
  HeaderWrapper,
  HeaderBlock,
  Logo,
  Nav,
  NewTaskButton,
  UserName,
} from './Header.styles';

export default function Header({ user, onNewCard, onExit, onToggleTheme, isDarkTheme }) {
  const [userOpen, setUserOpen] = useState(false);

  // 🔥 Используем пропс user вместо localStorage
  const userName = user?.name || 'Гость';
  const userEmail = user?.email || '';

  const handleExit = () => {
    setUserOpen(false);
    onExit?.();
  };

  return (
    <HeaderWrapper>
      <div className="container">
        <HeaderBlock>
          <Logo>
            <img 
              src={isDarkTheme ? "/assets/logo_dark.png" : "/assets/logo.png"} 
              alt="logo" 
            />
          </Logo>

          <Nav>
            <NewTaskButton onClick={onNewCard}>
              Создать новую задачу
            </NewTaskButton>

            <UserName onClick={() => setUserOpen((o) => !o)}>
              {userName}
            </UserName>

            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              style={{ marginLeft: '4px', cursor: 'pointer' }}
              onClick={() => setUserOpen((o) => !o)}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* 🔥 Один PopUser с правильными пропсами */}
            <PopUser
              open={userOpen}
              name={userName}
              email={userEmail}
              onClose={() => setUserOpen(false)}
              onExit={handleExit}
              onToggleTheme={onToggleTheme}
              isDarkTheme={isDarkTheme}
            />
          </Nav>
        </HeaderBlock>
      </div>
    </HeaderWrapper>
  );
}