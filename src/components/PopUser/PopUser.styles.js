import styled from 'styled-components';

export const PopUserContainer = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--card-bg, #ffffff);
  
  border-radius: var(--radius, 10px);
  padding: 16px;
  min-width: 220px;
  box-shadow: var(--shadow, 0 2px 16px rgba(74, 108, 247, 0.08));
  z-index: 200;
  transition: background 0.3s ease, border-color 0.3s ease;
`;

export const Name = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: #1e2a3b;
  margin-bottom: 4px;
`;

export const Email = styled.p`
  font-size: 13px;
  color: var(--text-muted, #94a6be);
  margin-bottom: 12px;
`;

export const ThemeBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #1e2a3b;
  margin-bottom: 12px;
  padding-bottom: 12px;
  
  gap: 12px;
`;


export const ThemeToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: var(--accent, #565eef);
  }

  &:checked + span::before {
    transform: translateX(20px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #EAEEF6;
  border-radius: 24px;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;


export const ContainerButton = styled.div`
  text-align: center;
`;

export const LogoutButton = styled.button`
  width: 72px;
  height: 30px;
  background: none;
  border: 1px solid var(--border, #d0dbe8);
  border-radius: var(--radius-sm, 4px);
  
  font-size: 14px;
  cursor: pointer;
  color: var(--text-primary, #1e2a3b);
  transition: background 0.15s;

  &:hover {
    background: var(--bg, #f0f4f9);
  }
`;