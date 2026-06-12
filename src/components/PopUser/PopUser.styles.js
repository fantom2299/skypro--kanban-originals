import styled from 'styled-components';

export const PopUserSet = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px;
  min-width: 220px;
  box-shadow: ${({ theme }) => theme.shadows.modal};
  z-index: 200;
`;

export const Name = styled.p`
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 4px;
`;

export const Mail = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 12px;
`;

export const ThemeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Checkbox = styled.input`
  width: 36px;
  height: 20px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

export const ExitButton = styled.button`
  width: 100%;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;
