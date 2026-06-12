import styled from 'styled-components';

const categoryStyles = {
  _orange: {
    background: 'orangeBg',
    color: 'orange',
  },
  _green: {
    background: 'greenBg',
    color: 'green',
  },
  _purple: {
    background: 'purpleBg',
    color: 'purple',
  },
};

export const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: box-shadow 0.15s, transform 0.15s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 20px rgba(74, 108, 247, 0.13);
    transform: translateY(-1px);
  }
`;

export const CardGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CardTheme = styled.div`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  ${({ theme, $variant = '_orange' }) => {
    const cfg = categoryStyles[$variant] || categoryStyles._orange;
    return `
      background: ${theme.colors[cfg.background]};
      color: ${theme.colors[cfg.color]};
    `;
  }}
`;

export const CardButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 4px;
  cursor: pointer;

  div {
    width: 4px;
    height: 4px;
    background: ${({ theme }) => theme.colors.textMuted};
    border-radius: 50%;
  }
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 8px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
`;
