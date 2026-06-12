import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  min-width: 260px;
  max-width: 280px;
  flex: 1;
`;

export const ColumnTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 14px;
  padding: 0 4px;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
