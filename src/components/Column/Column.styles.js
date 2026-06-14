import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  min-width: 234px;
`;

export const ColumnTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0;
  margin-bottom: 20px;
  padding: 0 4px;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
