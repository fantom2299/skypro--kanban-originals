import PopExit from '../PopExit/PopExit';
import { useState } from 'react';
import {
  PopUserContainer,
  Name,
  Email,
  ThemeBlock,
  ThemeToggle,
  ToggleInput,
  ToggleSlider,
  LogoutButton,
  ContainerButton,
} from './PopUser.styles';

export default function PopUser({
  open,
  onClose,
  onExit,
  onToggleTheme,
  isDarkTheme,
  name = 'Гость',
  email = '',
}) {

  const [showExitModal, setShowExitModal] = useState(false);

  const handleLogoutClick = () => {
    setShowExitModal(true);
  };

  const handleConfirmLogout = () => {
    setShowExitModal(false);
    onExit();
  };

  const handleCancelLogout = () => {
    setShowExitModal(false);
  };

  if (!open) return null;
  

  return (
    <>
    <PopUserContainer>
      <Name>{name || 'Гость'}</Name>
      <Email>{email || ''}</Email>

      <ThemeBlock>
        <p>Темная тема</p>
        <ThemeToggle>
          <ToggleInput
            type="checkbox"
            checked={isDarkTheme}
            onChange={onToggleTheme}
          />
          <ToggleSlider />
        </ThemeToggle>
      </ThemeBlock>
      <ContainerButton>
        <LogoutButton onClick={handleLogoutClick}>Выйти</LogoutButton>
      </ContainerButton>

      
    </PopUserContainer>

      {showExitModal && (
        <PopExit
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    
    </>
    
  );
}
