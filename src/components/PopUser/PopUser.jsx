import { useRef, useEffect } from 'react';
import {
  PopUserSet,
  Name,
  Mail,
  ThemeRow,
  Checkbox,
  ExitButton,
} from './PopUser.styles';

export default function PopUser({ open, name, email, onClose, onExit }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <PopUserSet ref={ref}>
      <Name>{name}</Name>
      <Mail>{email}</Mail>

      <ThemeRow>
        <p>Темная тема</p>
        <Checkbox type="checkbox" />
      </ThemeRow>

      <ExitButton type="button" onClick={onExit}>
        Выйти
      </ExitButton>
    </PopUserSet>
  );
}
