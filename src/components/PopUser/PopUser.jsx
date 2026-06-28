import { useEffect, useRef } from 'react';
import {
  PopUserContainer,
  Name,
  Email,
  ThemeBlock,
  Checkbox,
  LogoutButton,
} from './PopUser.styles';

export default function PopUser({ 
  open, 
  onClose, 
  onExit, 
  onToggleTheme, 
  isDarkTheme,
  name,
  email 
}) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <PopUserContainer ref={ref}>
      <Name>{name || 'Гость'}</Name>
      <Email>{email || ''}</Email>
      <ThemeBlock>
        <p>Темная тема</p>
        <Checkbox
          type="checkbox"
          checked={isDarkTheme}
          onChange={onToggleTheme}
        />
      </ThemeBlock>
      <LogoutButton onClick={onExit}>Выйти</LogoutButton>
    </PopUserContainer>
  );
}