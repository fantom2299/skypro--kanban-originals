import styled from 'styled-components';

export const PopUserContainer = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border, #d0dbe8);
  border-radius: var(--radius, 10px);
  padding: 16px;
  min-width: 220px;
  box-shadow: var(--shadow, 0 2px 16px rgba(74, 108, 247, 0.08));
  z-index: 200;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
`;

export const Name = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary, #1e2a3b);
  margin-bottom: 4px;
  transition: color 0.3s ease;
`;

export const Email = styled.p`
  font-size: 13px;
  color: var(--text-muted, #94a6be);
  margin-bottom: 12px;
  transition: color 0.3s ease;
`;

export const ThemeBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--text-primary, #1e2a3b);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border, #d0dbe8);
  transition: color 0.3s ease, border-color 0.3s ease;
`;

export const Checkbox = styled.input`
  width: 36px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--accent, #565eef);
`;

export const LogoutButton = styled.button`
  width: 100%;
  background: none;
  border: 1px solid var(--border, #d0dbe8);
  border-radius: var(--radius-sm, 4px);
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  color: var(--text-primary, #1e2a3b);
  transition: background 0.15s, color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background: var(--bg, #f0f4f9);
  }
`;