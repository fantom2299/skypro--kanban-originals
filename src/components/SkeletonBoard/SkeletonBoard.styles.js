import styled from 'styled-components';

export const Board = styled.div`
  display: flex;
  gap: 16px;
  padding: 28px 24px;
  overflow-x: auto;
`;

export const Column = styled.div`
  min-width: 260px;
  max-width: 280px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ColumnTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 4px;
  padding: 0 4px;
`;
